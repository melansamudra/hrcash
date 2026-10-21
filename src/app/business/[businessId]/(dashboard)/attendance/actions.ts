"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { purgeSelfies } from "@/lib/attendance/selfie";
import type { TablesUpdate } from "@/lib/types/database";
import { logActivity } from "@/lib/activity-log";
import { computeOvertimeHours, timeToMinutes } from "@/lib/payroll/overtime";

export type AttendanceStatus = "hadir" | "izin" | "sakit" | "alpa" | "off";

export async function setAttendanceStatus(
  businessId: string,
  employeeId: string,
  date: string,
  status: AttendanceStatus,
  note: string | null,
) {
  const supabase = await createClient();
  await supabase.from("attendance").upsert(
    { business_id: businessId, employee_id: employeeId, date, status, note },
    { onConflict: "employee_id,date" },
  );
  revalidatePath(`/business/${businessId}/attendance`);
}

export async function setAttendanceLate(
  businessId: string,
  attendanceId: string,
  late: boolean,
) {
  const supabase = await createClient();
  await supabase
    .from("attendance")
    .update({ late, late_minutes: late ? 1 : 0 })
    .eq("id", attendanceId)
    .eq("business_id", businessId);
  revalidatePath(`/business/${businessId}/attendance`);
}

export async function setAttendanceVerified(
  businessId: string,
  attendanceId: string,
  verified: boolean,
) {
  const supabase = await createClient();
  await supabase
    .from("attendance")
    .update({
      verified_by_admin: verified,
      verified_at: verified ? new Date().toISOString() : null,
      // Menyetujui membatalkan penolakan sebelumnya.
      ...(verified && { rejected_at: null, rejected_note: null }),
    })
    .eq("id", attendanceId)
    .eq("business_id", businessId);

  // Foto selfie dihapus begitu presensi disetujui (data lokasi, jam, dan
  // status tetap tersimpan). Yang belum disetujui dibersihkan cron setelah
  // SELFIE_RETENTION_DAYS hari.
  if (verified) {
    const { data: row } = await supabase
      .from("attendance")
      .select("id, check_in_photo_url, check_out_photo_url")
      .eq("id", attendanceId)
      .eq("business_id", businessId)
      .maybeSingle();
    if (row) await purgeSelfies(supabase, [row]);
  }

  revalidatePath(`/business/${businessId}/attendance`);
  revalidatePath(`/business/${businessId}/attendance/approval`);
}

// Tolak presensi: dicatat sebagai alpa supaya hitungan payroll tetap konsisten.
export async function rejectAttendance(businessId: string, attendanceId: string, note: string) {
  const supabase = await createClient();
  await supabase
    .from("attendance")
    .update({
      rejected_at: new Date().toISOString(),
      rejected_note: note.trim() || null,
      verified_by_admin: false,
      verified_at: null,
      status: "alpa",
    })
    .eq("id", attendanceId)
    .eq("business_id", businessId);
  revalidatePath(`/business/${businessId}/attendance`);
  revalidatePath(`/business/${businessId}/attendance/approval`);
}

export async function clearAttendance(businessId: string, attendanceId: string) {
  const supabase = await createClient();
  await supabase.from("attendance").delete().eq("id", attendanceId).eq("business_id", businessId);
  revalidatePath(`/business/${businessId}/attendance`);
}

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function addDays(date: string, days: number) {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

// Koreksi jam masuk/keluar oleh admin (mis. karyawan lupa absen). Jam dibaca
// sebagai WIB. Telat dan lembur dihitung ulang dengan aturan yang sama seperti
// absen selfie; kalau lembur wajib disetujui, jam lembur yang sudah ada tidak
// disentuh (isinya datang dari pengajuan yang disetujui).
export async function setAttendanceTimes(
  businessId: string,
  employeeId: string,
  date: string,
  checkIn: string,
  checkOut: string,
): Promise<{ error: string | null }> {
  if (!DATE_RE.test(date)) return { error: "Tanggal tidak valid." };
  if (checkIn && !TIME_RE.test(checkIn)) return { error: "Format jam masuk tidak valid." };
  if (checkOut && !TIME_RE.test(checkOut)) return { error: "Format jam keluar tidak valid." };
  if (checkOut && !checkIn) return { error: "Isi jam masuk dulu sebelum jam keluar." };

  const supabase = await createClient();

  const [{ data: business }, { data: assignment }, { data: existing }] = await Promise.all([
    supabase
      .from("businesses")
      .select("work_start_time, work_end_time, overtime_approval_required, overtime_min_minutes, overtime_rounding_minutes, overtime_max_hours")
      .eq("id", businessId)
      .single(),
    supabase
      .from("employee_shift_assignments")
      .select("shift_templates(start_time, end_time)")
      .eq("business_id", businessId)
      .eq("employee_id", employeeId)
      .eq("date", date)
      .maybeSingle(),
    supabase
      .from("attendance")
      .select("id, check_in_at, check_out_at, status")
      .eq("business_id", businessId)
      .eq("employee_id", employeeId)
      .eq("date", date)
      .maybeSingle(),
  ]);
  if (!business) return { error: "Bisnis tidak ditemukan." };

  const template = assignment?.shift_templates as unknown as { start_time: string; end_time: string } | null;
  const shiftStart = (template?.start_time ?? business.work_start_time).slice(0, 5);
  const shiftEnd = (template?.end_time ?? business.work_end_time).slice(0, 5);

  const inMinutes = checkIn ? timeToMinutes(checkIn) : 0;
  // Jam keluar lebih kecil dari jam masuk = shift lewat tengah malam.
  const outMinutes = checkOut ? timeToMinutes(checkOut) + (timeToMinutes(checkOut) < inMinutes ? 24 * 60 : 0) : 0;
  const checkInAt = checkIn ? new Date(`${date}T${checkIn}:00+07:00`) : null;
  const checkOutAt = checkOut ? new Date(`${addDays(date, outMinutes >= 24 * 60 ? 1 : 0)}T${checkOut}:00+07:00`) : null;

  const lateMinutes = checkIn ? Math.max(0, inMinutes - timeToMinutes(shiftStart)) : 0;

  const patch: TablesUpdate<"attendance"> = {
    check_in_at: checkInAt?.toISOString() ?? null,
    check_out_at: checkOutAt?.toISOString() ?? null,
    late: lateMinutes > 0,
    late_minutes: lateMinutes,
  };
  if (checkIn) patch.status = "hadir";
  if (!business.overtime_approval_required) {
    patch.overtime_hours =
      checkInAt && checkOutAt
        ? computeOvertimeHours({
            checkInAt,
            checkOutAt,
            checkOutMinutesFromShiftDay: outMinutes,
            shiftStart,
            shiftEnd,
            rules: {
              minMinutes: business.overtime_min_minutes,
              roundingMinutes: business.overtime_rounding_minutes,
              maxHoursPerDay: Number(business.overtime_max_hours),
            },
          }).hours
        : 0;
  }

  const { error } = existing
    ? await supabase.from("attendance").update(patch).eq("id", existing.id).eq("business_id", businessId)
    : await supabase.from("attendance").insert({
        business_id: businessId,
        employee_id: employeeId,
        date,
        status: "hadir",
        ...patch,
      });
  if (error) return { error: error.message };

  const label = (iso: string | null) =>
    iso ? new Date(iso).toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" }) : "—";
  await logActivity(
    supabase,
    businessId,
    "Koreksi jam presensi",
    `${date}: masuk ${label(existing?.check_in_at ?? null)} → ${checkIn || "—"}, keluar ${label(existing?.check_out_at ?? null)} → ${checkOut || "—"}`,
  );

  revalidatePath(`/business/${businessId}/attendance`);
  return { error: null };
}

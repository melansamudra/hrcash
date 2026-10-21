// Kelengkapan data karyawan. Tidak ada isian wajib selain nama; yang kosong
// cuma ditandai "belum lengkap" beserta keterangan apa yang masih kurang.

export type CompletenessInput = {
  birth_place?: string | null;
  birth_date?: string | null;
  marital_status?: string | null;
  religion?: string | null;
  nik?: string | null;
  id_number?: string | null;
  email?: string | null;
  phone?: string | null;
  id_address?: string | null;
  id_province?: string | null;
  id_city?: string | null;
  emergency_name?: string | null;
  emergency_phone?: string | null;
  join_date?: string | null;
  organization_id?: string | null;
  position_id?: string | null;
  rank_id?: string | null;
  daily_rate?: number | string | null;
  monthly_rate?: number | string | null;
};

export const COMPLETENESS_COLUMNS =
  "birth_place, birth_date, marital_status, religion, nik, id_number, email, phone, id_address, id_province, id_city, emergency_name, emergency_phone, join_date, organization_id, position_id, rank_id, daily_rate, monthly_rate";

const blank = (v: string | null | undefined) => !v || !v.trim();

/** Daftar data yang masih kosong (label bahasa Indonesia); kosong = sudah lengkap. */
export function missingEmployeeFields(e: CompletenessInput): string[] {
  const missing: string[] = [];
  if (blank(e.birth_place) || blank(e.birth_date)) missing.push("tempat/tanggal lahir");
  if (blank(e.marital_status)) missing.push("status perkawinan");
  if (blank(e.religion)) missing.push("agama");
  if (blank(e.nik) && blank(e.id_number)) missing.push("ID kartu identitas");
  if (blank(e.email)) missing.push("email");
  if (blank(e.phone)) missing.push("nomor ponsel");
  if (blank(e.id_address) || blank(e.id_province) || blank(e.id_city)) missing.push("alamat");
  if (blank(e.emergency_name) || blank(e.emergency_phone)) missing.push("kontak darurat");
  if (blank(e.join_date)) missing.push("tanggal bergabung");
  if (!e.organization_id || !e.position_id || !e.rank_id) missing.push("organisasi/jabatan/pangkat");
  if (!(Number(e.daily_rate) > 0) && !(Number(e.monthly_rate) > 0)) missing.push("gaji");
  return missing;
}

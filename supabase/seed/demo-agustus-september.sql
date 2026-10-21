-- Jadwal shift + absensi Agustus & September 2026 untuk SEMUA karyawan aktif
-- bisnis demo ("Toko Demo Maju Jaya"). Dijalankan manual di Supabase SQL Editor,
-- terpisah dari demo-1..5.sql, dan aman diulang: baris yang sudah ada (jadwal
-- atau absensi di tanggal yang sama) tidak ditimpa.
--
-- Pola: Senin–Sabtu kerja, Minggu libur. 17 Agustus = libur (status off).
-- Dewi & Nina shift Siang (12:00–21:00), lainnya Reguler (08:00–17:00).
-- Sebagian kecil hari diisi telat, lembur, sakit, izin, dan 1 alpa (Andi),
-- acak tapi konsisten (berdasarkan nama + tanggal). Semua sudah terverifikasi.
-- Slip gaji TIDAK dibuat di sini — pakai tombol Generate Payroll.
do $$
declare
  v_biz uuid;
  v_start date := date '2026-08-01';
  v_end date := date '2026-09-30';
begin
  select id into v_biz from public.businesses
    where name = 'Toko Demo Maju Jaya' order by created_at desc limit 1;
  if v_biz is null then raise exception 'Bisnis demo tidak ditemukan.'; end if;

  -- Pastikan 2 shift template ada (dibuat demo-1.sql; ini cadangan).
  insert into public.shift_templates (business_id, name, start_time, end_time)
  select v_biz, 'Reguler', '08:00', '17:00'
  where not exists (select 1 from public.shift_templates where business_id = v_biz and name = 'Reguler');
  insert into public.shift_templates (business_id, name, start_time, end_time)
  select v_biz, 'Siang', '12:00', '21:00'
  where not exists (select 1 from public.shift_templates where business_id = v_biz and name = 'Siang');

  -- Jadwal kerja Senin–Sabtu.
  insert into public.employee_shift_assignments (business_id, employee_id, date, shift_template_id)
  select v_biz, e.id, d::date,
    (select id from public.shift_templates where business_id = v_biz and name =
      case when e.name in ('Dewi Lestari', 'Nina Kartika') then 'Siang' else 'Reguler' end)
  from public.employees e cross join generate_series(v_start, v_end, interval '1 day') d
  where e.business_id = v_biz and e.active and e.deleted_at is null
    and extract(isodow from d) <> 7
  on conflict (employee_id, date) do nothing;

  -- Absensi.
  insert into public.attendance (business_id, employee_id, date, status, note, late, late_minutes,
    check_in_at, check_out_at, overtime_hours, verified_by_admin, verified_at, shift_template_id)
  select v_biz, x.eid, x.dt, x.st, x.nt, (x.st = 'hadir' and x.lm > 0), case when x.st = 'hadir' then x.lm else 0 end,
    case when x.st = 'hadir' then (x.dt + x.s_in + make_interval(mins => x.lm)) at time zone 'Asia/Jakarta' end,
    case when x.st = 'hadir' then (x.dt + x.s_out + make_interval(mins => round(x.ot * 60)::int + x.r % 9)) at time zone 'Asia/Jakarta' end,
    case when x.st = 'hadir' then x.ot else 0 end,
    true, now(), x.shift_id
  from (
    select b.*,
      case
        when b.dt = date '2026-08-17' then 'off'
        when b.r in (15, 16) then 'sakit'
        when b.r = 17 then 'izin'
        when b.r = 18 and b.nm = 'Andi Pratama' then 'alpa'
        else 'hadir'
      end as st,
      case
        when b.dt = date '2026-08-17' then 'Libur HUT RI'
        when b.r in (15, 16) then 'Sakit, surat dokter menyusul'
        when b.r = 17 then 'Urusan keluarga'
      end as nt,
      case when b.r < 15 then 5 + (b.r * 3) % 40 else 0 end as lm,
      case
        when b.r < 15 or b.r between 15 and 18 then 0
        when b.nm = 'Rudi Hartono' and b.r % 3 = 0 then 1 + ((b.r / 3) % 4) * 0.5
        when b.nm in ('Budi Santoso', 'Andi Pratama') and b.r % 6 = 0 then 0.5 + ((b.r / 6) % 3) * 0.5
        else 0
      end::numeric as ot
    from (
      select e.id as eid, e.name as nm, d::date as dt,
        abs(hashtext(e.name || d::date::text)) % 100 as r,
        (select id from public.shift_templates where business_id = v_biz and name =
          case when e.name in ('Dewi Lestari', 'Nina Kartika') then 'Siang' else 'Reguler' end) as shift_id,
        case when e.name in ('Dewi Lestari', 'Nina Kartika') then time '12:00' else time '08:00' end as s_in,
        case when e.name in ('Dewi Lestari', 'Nina Kartika') then time '21:00' else time '17:00' end as s_out
      from public.employees e cross join generate_series(v_start, v_end, interval '1 day') d
      where e.business_id = v_biz and e.active and e.deleted_at is null
        and extract(isodow from d) <> 7
    ) b
  ) x
  on conflict (employee_id, date) do nothing;

  raise notice 'Jadwal dan absensi Agustus–September 2026 selesai.';
end
$$;

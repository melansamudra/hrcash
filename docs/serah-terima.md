# Serah Terima Pekerjaan — HrCash / ABSENKU

Dokumen ini merangkum seluruh pekerjaan di repo `melansamudra/hrcash` agar bisa diteruskan oleh orang lain tanpa konteks sebelumnya.
Disusun dari isi repo dan riwayat git (101 commit, commit terakhir `06c3ec9`). Detail teknis per modul ada di `README.md`.

## 1. Gambaran produk

Aplikasi SaaS berdiri sendiri untuk **absensi selfie, data karyawan (SDM), dan payroll** bagi UMKM Indonesia. Nama internal repo/paket: `absenku`; nama di pemasaran: **HrCash**.

- **Stack:** Next.js 16 (App Router, TypeScript, Tailwind 4), React 19, Supabase (Postgres, Auth, Storage), Resend (email, opsional), Leaflet (peta), Vitest.
- **Hosting:** Vercel (region `syd1`), Vercel Cron harian untuk pembersih selfie.
- **Model bisnis:** bayar **sekali beli** (bukan langganan). Bisnis baru berstatus `unpaid` dan dashboard terkunci sampai admin platform menandai `paid` lewat `/admin`.
- **Peran pengguna:** `owner`, `admin` (akses penuh), `hr` (tanpa Payroll/Laporan/Pengaturan), `staff` (seperti hr, tanpa menu Karyawan). Karyawan tidak punya akun: masuk lewat link publik + PIN.

> Peringatan Next.js: `AGENTS.md` menyatakan versi Next.js ini punya breaking changes. Baca `node_modules/next/dist/docs/` sebelum mengubah kode framework.

## 2. Fitur yang sudah selesai

### Backoffice (`/business/[businessId]/…`)
| Modul | Isi |
|---|---|
| Beranda | Demografi, gaji bulan ini, kalender, widget pending |
| Karyawan | Wizard tambah, tambah cepat, detail, riwayat karir & gaji, impor/ekspor CSV, tunjangan tetap, PIN massal ("Buat PIN untuk Semua"), keterangan data belum lengkap |
| Presensi | Grid harian, koreksi jam oleh admin, approval (menunggu/disetujui/ditolak), rekap per karyawan |
| Shift & Jadwal | Template shift, penugasan harian, **Jadwal Tetap / pola mingguan** |
| Cuti | Jenis cuti, pengajuan + approval, sisa kuota, **cuti lanjutan (carry-over) & cuti bersama** |
| Lembur | Aturan lembur (flat / PP 35), pengajuan & approval dari portal |
| Payroll | Generate massal, rekap pra-slip, detail slip + cetak, kasbon, pinjaman pribadi, **Slip Tidak Tetap (ad-hoc)**, Laporan (+ cetak/PDF, salin WhatsApp) |
| Pajak & BPJS | PPh 21 metode TER, BPJS Kesehatan/JHT/JP/JKK/JKM (opsional per bisnis) |
| KPI | Formulir indikator berbobot → jadwal penilaian → evaluasi |
| Lainnya | Reimbursement, Surat (template), Tugas, Pengumuman, Lokasi kantor, Activity Log, Laporan (ringkasan gaji, per organisasi, per komponen, PPh 21, BPJS) |
| Pengaturan | Hub pengaturan; umum, lokasi, master data (organisasi/jabatan/pangkat), staff & role, potongan telat bertingkat, hari libur, link portal/absen/cuti |
| Tampilan | Terbaru: gaya mirip Poscash (palet biru cerah, top bar biru, sidebar pill) |

### Sisi karyawan (tanpa login akun)
- `/karyawan/[slug]` **Portal Karyawan**: login dua langkah (nama → PIN 4 digit via keypad, langsung masuk), rekap absensi, sisa cuti, slip gaji (12 terakhir), kasbon/pinjaman, pengajuan lembur, ganti PIN sendiri, foto profil, pengumuman. Sesi cookie HMAC 7 hari.
- `/karyawan/[slug]/absen`: Check In/Out bergaya peta, selfie, alasan terlambat wajib, nama otomatis dari portal, tombol "Bukan saya", tanpa PIN ulang saat absen dari portal.
- `/absen/[slug]` dan `/cuti/[slug]`: link publik absen selfie dan pengajuan cuti.

### Keamanan & kepatuhan data
- Geofence (haversine di server), PIN scrypt dengan kunci sementara 5× salah / 15 menit, cooldown anti-spam (`public_submission_log`), RLS semua tabel via `private.owns_business()`.
- Bucket `attendance-selfies` privat (signed URL 1 jam). **Retensi selfie:** dihapus saat disetujui, atau otomatis 30 hari setelah tanggal absen (Cron `/api/cron/cleanup-selfies`).
- Halaman Syarat & Ketentuan (`/syarat-ketentuan`) dan Kebijakan Privasi (`/kebijakan-privasi`).

### Admin platform & demo
- `/admin`: daftar bisnis dan tombol tandai lunas (akses via env `PLATFORM_ADMIN_EMAILS`).
- Tombol "Lihat Demo" / "Demo Portal" di login dan landing, memakai akun demo (env `DEMO_*`).
- Data demo: `supabase/seed/demo-1..5.sql` + `demo-agustus-september.sql` (10 karyawan, PIN di `supabase/seed/README.md`).

### Pemasaran (folder `marketing/`)
- `01-konten-medsos-dan-iklan-meta.md`: naskah konten dan copy iklan Meta.
- `02-analisa-perkiraan-closing.md`: perkiraan closing.
- `ads/`: generator gambar iklan (24 hook 4:5 dan 1:1, 11 konsep kreatif 3 ukuran, carousel), hasil di `out/`, `out-kreatif/` dan zip siap upload.
- `video/` (hasil render V1–V10, 9:16) dan `video-src/` (kode Remotion; rekaman layar mentah tidak disimpan di repo, lihat `video-src/README.md`).

## 3. Cara menjalankan

```bash
npm install
cp .env.example .env.local   # isi variabel, lihat bagian 4
npx supabase link --project-ref <project-ref>
npx supabase db push         # 34 migration, urut nama file
npm run dev
npm test                     # vitest
npm run lint
npm run build
```

Folder `marketing/` sengaja dikecualikan dari tsc/eslint. Folder `video-src` punya `package.json` sendiri (`npm install`, `npm run studio`).

## 4. Konfigurasi & rahasia (env)

| Variabel | Wajib | Fungsi |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya | Koneksi Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Ya | Service-role (absen, portal, admin). Juga basis kunci sesi portal |
| `PLATFORM_ADMIN_EMAILS` | Ya untuk `/admin` | Email admin platform, pisah koma |
| `CRON_SECRET` | Ya untuk produksi | Tanpa ini cron pembersih selfie menolak semua request |
| `PORTAL_SESSION_SECRET` | Opsional | Kunci sesi portal; default turunan service-role key |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | Opsional | Email approve/tolak cuti |
| `DEMO_LOGIN_EMAIL`, `DEMO_LOGIN_PASSWORD`, `DEMO_PORTAL_SLUG` | Opsional | Tombol demo |
| `SELFIE_RETENTION_DAYS` | Opsional | Masa simpan selfie (default 30) |

Serah terimakan juga akses ke: akun Supabase, proyek Vercel (+ domain), akun Resend, repo GitHub, dan akun demo. Rahasia tidak ada di repo; serahkan lewat password manager, jangan lewat chat.

## 5. Database

34 migration di `supabase/migrations/` (urutan dan isi sampai migration ke-18 ada di README; sisanya berurutan: lokasi/reimbursement/surat/tugas, identitas & foto karyawan, pengumuman, master karyawan, riwayat, penolakan presensi, KPI, status pembayaran, role HR/staff, pencarian user via email, jadwal mingguan, alasan telat, cuti carry-over, slip ad-hoc).
Catatan: dua file berawalan `20261018100000_` (late_reason dan leave_carryover) berbagi timestamp; keduanya bekerja tetapi urutan antar keduanya mengikuti nama file.
`src/lib/types/database.ts` masih ditulis manual; ganti dengan `supabase gen types typescript` setelah proyek tertaut.

## 6. Batasan & risiko yang diketahui

1. **PPh 21 dan BPJS belum diverifikasi ahli.** Tabel TER ditranskrip dari agregator pihak ketiga (per 2026-09-20); tidak ada rekonsiliasi Desember; THR/bonus digabung ke bulan berjalan. Batas upah JP harus diperbarui tiap Maret. Wajib dicek akuntan/konsultan pajak sebelum dipakai pelaporan resmi.
2. **Lembur PP 35 disederhanakan:** hari libur/istirahat dihitung seperti hari kerja; aturan upah pokok 75% tidak diterapkan.
3. **Geofence bisa dipalsukan** (fake GPS); anti-spam hanya cooldown berbasis tabel, bukan rate limit edge.
4. **Pembayaran manual:** tidak ada payment gateway; pelunasan ditandai tangan oleh admin platform di `/admin`.
5. **Build hanya di `main`:** `scripts/vercel-ignore-build.sh` melewati build untuk branch lain dan perubahan yang hanya `docs/`, `supabase/`, `*.md`.
6. **Seed demo** tidak membuat slip gaji (klik "Generate Payroll" setelah seed) dan perlu dijalankan ulang tiap beberapa minggu agar "bulan berjalan" tetap mutakhir.
7. **Belum diverifikasi saat serah terima ini ditulis:** `npm test`, `tsc`, dan `npm run build` tidak dijalankan di sesi penyusunan dokumen (dependency belum terpasang). Jalankan sebelum rilis.

## 7. Belum dikerjakan (backlog)

- Notifikasi WhatsApp (selain email).
- Payment gateway / billing otomatis.
- Undang admin/staff lewat email: halaman `settings/staff` sudah ada; pastikan alurnya sesuai kebutuhan.
- Dari spesifikasi acuan (`docs/gajihub-spec.md`): Bukti Potong/Coretax, komponen slip kustom, Peran & Hak Akses lanjutan, Rekrutmen, Inventaris Aset, Time Tracker, pelacakan lokasi realtime, kunjungan klien, approval lintas modul. Halaman KPI GajiHub belum dicocokkan detailnya.
- Integrasi akuntansi/jurnal: sengaja tidak dibangun.
- Perlu dirapikan: README bagian "Belum digarap" dan struktur folder sudah usang (landing page, halaman legal, dan peran sudah ada).

## 8. Checklist serah terima

- [ ] Akses repo GitHub, Vercel, Supabase, Resend, domain
- [ ] Env produksi terisi (bagian 4), `CRON_SECRET` ada
- [ ] Semua migration sudah ter-push ke database produksi
- [ ] `npm test`, `npm run lint`, `npm run build` hijau
- [ ] Login akun demo dan Portal Karyawan demo berfungsi
- [ ] Penerima paham alur penandaan lunas di `/admin`
- [ ] Penerima tahu batasan PPh 21/BPJS (bagian 6, poin 1) dan menyampaikannya ke pelanggan
- [ ] Aset pemasaran (zip iklan, video) diserahkan; rekaman layar mentah V4 diminta terpisah bila perlu render ulang

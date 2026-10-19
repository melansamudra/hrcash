// Proposal penawaran HrCash (PDF A4). Pakai: node proposal.mjs <output.pdf> ["Nama Usaha"] ["tanggal"]
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
import QRCode from "qrcode";
const require = createRequire(import.meta.url);
const fontDir = path.dirname(require.resolve("@fontsource/inter/package.json")) + "/files";
const font = (w) => pathToFileURL(`${fontDir}/inter-latin-${w}-normal.woff2`).href;
const img = (f) => "data:image/jpeg;base64," + readFileSync(path.resolve(f)).toString("base64");
const OUT = path.resolve(process.argv[2] ?? "proposal-hrcash.pdf");
const NAMA = process.argv[3] ?? "Bapak/Ibu Pemilik Usaha";
const TGL = process.argv[4] ?? new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
const WA = "0812-3455-6757";
const qr = await QRCode.toDataURL("https://wa.me/6281234556757?text=Halo%2C%20saya%20tertarik%20dengan%20HrCash", { margin: 1, width: 360, color: { dark: "#17436a", light: "#ffffff" } });

const ic = {
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  cam: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 4l-1.5 2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2.5L15 4H9zm3 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6a2 2 0 012-2h11v3H6v1h13a1 1 0 011 1v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm12 7a1.3 1.3 0 100 2.6 1.3 1.3 0 000-2.6z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8" r="3.6"/><path d="M2.5 20c.5-4 3-6 6.5-6s6 2 6.5 6z"/></svg>`,
  wa: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.2a12.6 12.6 0 006 1.5c7 0 12.6-5.6 12.6-12.6S23 3 16 3zm0 22.9c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.2 1.3 1.4-4-.3-.4a10.2 10.2 0 01-1.6-5.5C5.6 9.9 10.3 5.2 16 5.2s10.4 4.7 10.4 10.3S21.7 25.9 16 25.9zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.4 8.4 0 01-4.2-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 00-.9.4 3.7 3.7 0 00-1.1 2.7c0 1.6 1.1 3.2 1.3 3.4s2.3 3.5 5.6 4.9c2 .9 2.8.9 3.8.8.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4-.3-.2-.6-.4z"/></svg>`,
};
const logo = (dark = true) => `<div class="logo ${dark ? "" : "lt"}"><span class="lm">${ic.check}</span>HrCash</div>`;
let pageNo = 0; const TOTAL = 7;
const pg = (cls, inner, foot = true) => { pageNo++; return `<section class="pg ${cls}">${inner}${foot ? `<div class="foot"><span>HrCash by Cash Impact</span><span>Proposal untuk ${NAMA}</span><span>Hal. ${pageNo}/${TOTAL}</span></div>` : ""}</section>`; };

const menus = ["Kehadiran (Check In/Out)", "Papan Info", "Cuti", "Lembur", "Gaji dan slip", "Surat Peringatan", "Surat Keterangan", "Kegiatan Karyawan", "Penugasan", "Reimburse", "Jadwal Kerja", "Profil Saya"];
const admin = ["Dashboard ringkasan kehadiran dan gaji bulanan", "Persetujuan absensi, cuti, dan lembur", "Rekap presensi bulanan per karyawan", "Penggajian dan slip gaji", "Laporan gaji per karyawan, organisasi, dan komponen", "Laporan pembayaran gaji dan rekap", "Laporan PPh 21 dan iuran BPJS per karyawan", "Kasbon, pinjaman, dan penyesuaian gaji", "Jadwal shift, pola mingguan, lokasi, hari libur", "Penilaian KPI dan reimburse", "Surat, pengumuman, dan tugas", "Log aktivitas"];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:400;src:url(${font(400)})}@font-face{font-family:Inter;font-weight:600;src:url(${font(600)})}@font-face{font-family:Inter;font-weight:800;src:url(${font(800)})}
@page{size:A4;margin:0}
:root{--b50:#f1f7fd;--b100:#e3effc;--b200:#c4d8ee;--b600:#3b6a97;--b700:#2b5a85;--b900:#17436a;--amber:#f5a524;--ink:#10243a;--sub:#4a6580;--ok:#1f9d6b;--neg:#c2410c}
*{box-sizing:border-box;margin:0}body{font-family:Inter,sans-serif;color:var(--ink);-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:210mm;height:297mm;padding:18mm 16mm 20mm;position:relative;overflow:hidden;page-break-after:always;display:flex;flex-direction:column}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:20px;color:#fff}.lm{width:32px;height:32px;border-radius:9px;background:#fff;color:var(--b700);display:grid;place-items:center}.lm svg{width:20px;height:20px}.logo.lt{color:var(--ink)}.logo.lt .lm{background:var(--b700);color:#fff}
.pg:not(.cover)>*:not(.foot){zoom:1.3}.pg:not(.cover)>.logo{zoom:1.1}
.foot{position:absolute;left:16mm;right:16mm;bottom:9mm;display:flex;justify-content:space-between;font-size:10px;color:var(--sub);font-weight:600;border-top:1px solid #dbe6f1;padding-top:6px}
h2{font-size:30px;font-weight:800;letter-spacing:-1px;line-height:1.1;margin-top:14px}h2 em{font-style:normal;color:var(--b700)}.lead{font-size:14px;color:var(--sub);margin-top:10px;line-height:1.5;font-weight:600;max-width:150mm}
.cover{background:radial-gradient(700px 500px at 85% 10%,#3f79ad 0%,transparent 60%),linear-gradient(165deg,#1f5287,#0b2237);color:#fff}.cover .foot{color:#c4d8ee;border-color:rgba(255,255,255,.25)}
.cover h1{font-size:54px;font-weight:800;letter-spacing:-2px;line-height:1.02;margin-top:34mm}.cover h1 em{font-style:normal;color:var(--amber)}.cover .sub{font-size:19px;color:var(--b200);margin-top:14px;font-weight:600;line-height:1.4;max-width:120mm}
.offer{margin-top:14mm;background:var(--amber);color:#2b1a00;border-radius:18px;padding:16px 22px;display:inline-block;align-self:flex-start}.offer b{font-size:44px;letter-spacing:-2px;line-height:1;display:block}.offer span{font-size:14px;font-weight:800}
.meta{margin-top:12mm;font-size:13px;line-height:1.7;color:var(--b200)}.meta b{color:#fff}
.cphone{position:absolute;right:14mm;bottom:22mm;width:62mm;border:7px solid #0b1623;border-radius:30px;background:#0b1623;box-shadow:0 20px 40px rgba(0,0,0,.4);overflow:hidden;transform:rotate(4deg)}.cphone img{width:100%;display:block;margin-top:-6%}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10mm}
.card{border:1.5px solid #dbe6f1;border-radius:16px;padding:16px 18px;background:#fff}.card h3{font-size:16px;font-weight:800;letter-spacing:-.3px}.card p{font-size:12.5px;color:var(--sub);line-height:1.5;margin-top:6px;font-weight:600}
.pain .card{border-color:#f3d4c6;background:#fff8f4}.pain i{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#fde7df;color:var(--neg);padding:7px;margin-bottom:8px}
.quote{margin-top:10mm;background:var(--b900);color:#fff;border-radius:18px;padding:20px 24px;font-size:19px;font-weight:800;letter-spacing:-.5px;line-height:1.3}.quote em{font-style:normal;color:var(--amber)}
.pill3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:9mm}.pill3 .card{padding:14px}.pill3 .ic{width:40px;height:40px;border-radius:12px;background:var(--b100);color:var(--b700);display:grid;place-items:center;padding:9px;margin-bottom:8px}
ul.tick{list-style:none;padding:0;margin-top:8px}ul.tick li{display:flex;gap:8px;font-size:12px;font-weight:600;color:var(--ink);padding:3px 0;line-height:1.35}ul.tick li:before{content:"";flex:none;width:14px;height:14px;margin-top:2px;border-radius:50%;background:var(--ok) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'><path d='M5 12.5l4.5 4.5L19 7.5'/></svg>") center/9px no-repeat}
.split{display:grid;grid-template-columns:1fr 62mm;gap:14px;margin-top:8mm;align-items:start}.ph{border:6px solid #0b1623;border-radius:26px;background:#0b1623;overflow:hidden;box-shadow:0 14px 30px rgba(16,36,58,.25)}.ph img{width:100%;display:block;margin-top:-6%}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:8mm}.col{border-radius:16px;padding:16px 18px}.col.a{background:var(--b50)}.col.b{background:var(--b900);color:#fff}.col h3{font-size:15px;font-weight:800;margin-bottom:6px}.col.b ul.tick li{color:#fff}
.steps{margin-top:9mm;display:flex;flex-direction:column;gap:11px}.st{display:flex;gap:14px;align-items:flex-start;border:1.5px solid #dbe6f1;border-radius:16px;padding:14px 18px}.st .n{width:34px;height:34px;border-radius:50%;background:var(--amber);color:#2b1a00;font-weight:800;display:grid;place-items:center;flex:none;font-size:16px}.st b{font-size:15px;display:block}.st span{font-size:12.5px;color:var(--sub);font-weight:600;line-height:1.45;display:block;margin-top:3px}
.price{margin-top:9mm;background:linear-gradient(160deg,#1f5287,#0b2237);color:#fff;border-radius:22px;padding:24px 28px;display:flex;gap:20px;align-items:center;justify-content:space-between}.price .big b{font-size:58px;letter-spacing:-3px;color:var(--amber);line-height:1;display:block}.price .big span{font-size:16px;font-weight:800}.price ul.tick li{color:#fff;font-size:12.5px}
table{width:100%;border-collapse:collapse;margin-top:8px;font-size:12.5px}th{background:var(--b100);text-align:left;padding:9px 12px;font-weight:800}td{padding:9px 12px;border-bottom:1px solid #e6eef6;font-weight:600}td.g{color:var(--ok);font-weight:800}td.r{color:var(--neg);font-weight:800}
.note{font-size:11px;color:var(--sub);margin-top:8px;line-height:1.45;font-weight:600}
.faq .q{border-bottom:1px solid #e6eef6;padding:9px 0}.faq b{font-size:13px;display:block}.faq span{font-size:12px;color:var(--sub);font-weight:600;line-height:1.45;display:block;margin-top:2px}
.cta{margin-top:7mm;background:var(--b50);border-radius:20px;padding:18px 22px;display:flex;gap:20px;align-items:center}.cta img{width:36mm;height:36mm;border-radius:10px;border:1px solid #dbe6f1}.cta h3{font-size:20px;font-weight:800;letter-spacing:-.6px}.cta .wa{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:24px;font-weight:800;color:var(--b900)}.cta .wa svg{width:30px;height:30px;color:#1faa59}.cta p{font-size:12px;color:var(--sub);font-weight:600;margin-top:6px;line-height:1.45}
</style></head><body>
${pg("cover", `${logo()}
  <h1>Proposal<br><em>Penawaran</em></h1>
  <div class="sub">Absensi selfie + lokasi, laporan gaji otomatis, dan Portal Karyawan untuk usaha Anda.</div>
  <div class="offer"><b>Rp349.000</b><span>sekali beli, bukan langganan</span></div>
  <div class="meta"><div>Disiapkan untuk: <b>${NAMA}</b></div><div>Tanggal: <b>${TGL}</b></div><div>Kontak: <b>WhatsApp ${WA}</b></div></div>
  <div class="cphone"><img src="${img("shot-home.jpg")}"></div>`)}
${pg("", `${logo(false)}<h2>Tantangan yang sering <em>dihadapi pemilik usaha</em></h2>
  <div class="lead">Mengurus karyawan seharusnya tidak menyita waktu yang lebih berharga untuk mengembangkan usaha.</div>
  <div class="grid2 pain">
   <div class="card"><i>${ic.x}</i><h3>Absen tanpa bukti</h3><p>Absen di buku atau grup chat mudah diubah, dititipkan, dan sulit dibuktikan.</p></div>
   <div class="card"><i>${ic.x}</i><h3>Rekap dan hitung gaji memakan waktu</h3><p>Telat, lembur, izin, dan kasbon dihitung satu per satu. Satu angka salah, hasil akhir ikut salah.</p></div>
   <div class="card"><i>${ic.x}</i><h3>Pertanyaan karyawan berulang</h3><p>Slip gaji, sisa cuti, dan sisa kasbon ditanyakan lewat chat setiap bulan.</p></div>
   <div class="card"><i>${ic.x}</i><h3>Biaya aplikasi yang terus berjalan</h3><p>Banyak aplikasi menagih per karyawan setiap bulan, sehingga biaya naik seiring tim bertambah.</p></div>
  </div>
  <div class="quote">Waktu pemilik usaha seharusnya untuk <em>pelanggan dan pertumbuhan,</em> bukan untuk administrasi.</div>`)}
${pg("", `${logo(false)}<h2>Solusi: <em>HrCash</em></h2>
  <div class="lead">Aplikasi absensi dan payroll berbasis web. Karyawan cukup membuka link di HP, tanpa install aplikasi.</div>
  <div class="split"><div>
    <div class="card" style="margin-bottom:10px"><h3>1. Absen yang ada buktinya</h3><ul class="tick"><li>Selfie wajah saat absen</li><li>Lokasi terbaca di peta</li><li>Jam tercatat otomatis oleh sistem</li><li>PIN pribadi untuk tiap karyawan</li></ul></div>
    <div class="card" style="margin-bottom:10px"><h3>2. Laporan gaji otomatis</h3><ul class="tick"><li>Telat dan lembur terhitung dari data absen</li><li>Kasbon dan potongan tercatat jelas</li><li>Slip gaji siap untuk setiap karyawan</li></ul></div>
    <div class="card"><h3>3. Portal Karyawan</h3><ul class="tick"><li>Karyawan cek slip, sisa cuti, dan jadwal sendiri</li><li>Ajukan cuti, lembur, dan reimburse dari HP</li><li>Papan info untuk pengumuman tim</li></ul></div>
  </div><div class="ph"><img src="${img("shot-menu.jpg")}"></div></div>
  <div class="note">Tampilan layar adalah contoh dengan data demo.</div>`)}
${pg("", `${logo(false)}<h2>Fitur <em>lengkap</em> dalam satu sistem</h2>
  <div class="lead">Dari sisi karyawan sampai sisi pemilik usaha, semua terhubung ke satu data kehadiran.</div>
  <div class="cols"><div class="col a"><h3>Untuk karyawan (Portal)</h3><ul class="tick">${menus.map((m) => `<li>${m}</li>`).join("")}</ul></div>
  <div class="col b"><h3>Untuk pemilik usaha (Dashboard)</h3><ul class="tick">${admin.map((m) => `<li>${m}</li>`).join("")}</ul></div></div>
  <div class="note" style="margin-top:12px">Daftar menu mengikuti fitur yang tersedia di sistem saat proposal ini dibuat. Tanyakan kami untuk kebutuhan khusus usaha Anda.</div>`)}
${pg("", `${logo(false)}<h2>Cara kerja: <em>mudah dan cepat</em></h2>
  <div class="lead">Dari pembayaran sampai karyawan mulai absen, prosesnya sederhana.</div>
  <div class="steps">
   <div class="st"><div class="n">1</div><div><b>Konsultasi singkat via WhatsApp</b><span>Ceritakan jumlah karyawan dan kebutuhan usaha Anda. Kami jawab pertanyaan Anda.</span></div></div>
   <div class="st"><div class="n">2</div><div><b>Pembayaran sekali beli</b><span>Rp349.000, tanpa biaya bulanan. Metode pembayaran dikonfirmasi melalui WhatsApp.</span></div></div>
   <div class="st"><div class="n">3</div><div><b>Aktivasi dan data karyawan</b><span>Akun diaktifkan setelah pembayaran dikonfirmasi. Anda mengisi data usaha dan karyawan.</span></div></div>
   <div class="st"><div class="n">4</div><div><b>Bagikan link ke karyawan</b><span>Satu link untuk semua karyawan. Mereka masuk dengan PIN dan langsung bisa absen selfie.</span></div></div>
   <div class="st"><div class="n">5</div><div><b>Laporan terkumpul otomatis</b><span>Rekap kehadiran, lembur, dan laporan gaji tersedia di dashboard Anda.</span></div></div>
  </div>`)}
${pg("", `${logo(false)}<h2>Investasi: <em>sekali beli</em></h2>
  <div class="price"><div class="big"><b>Rp349.000</b><span>sekali beli, bukan langganan</span></div>
   <ul class="tick" style="flex:1;max-width:300px"><li>Tanpa biaya bulanan</li><li>Tanpa biaya per karyawan</li><li>Tanpa install aplikasi</li><li>Absen selfie + lokasi</li><li>Laporan gaji dan Portal Karyawan</li></ul></div>
  <h3 style="margin-top:9mm;font-size:16px;font-weight:800">Ilustrasi perbandingan biaya</h3>
  <table><tr><th>Lama pemakaian (10 karyawan)</th><th>Langganan per karyawan*</th><th>HrCash sekali beli</th></tr>
   <tr><td>1 tahun</td><td class="r">Rp1.200.000</td><td class="g">Rp349.000</td></tr>
   <tr><td>2 tahun</td><td class="r">Rp2.400.000</td><td class="g">Rp349.000</td></tr>
   <tr><td>3 tahun</td><td class="r">Rp3.600.000</td><td class="g">Rp349.000</td></tr></table>
  <div class="note">*Ilustrasi hitungan: langganan Rp10.000 per karyawan per bulan x 10 karyawan x 12 bulan. Angka ini hanya contoh, bukan harga pihak tertentu. Bandingkan dengan tagihan yang Anda bayar saat ini.</div>
  <div class="quote" style="margin-top:8mm">Biaya yang sama, <em>tanpa tagihan bulanan</em> dan tanpa tambahan biaya saat tim bertambah.</div>`)}
${pg("", `${logo(false)}<h2>Pertanyaan umum &amp; <em>langkah berikutnya</em></h2>
  <div class="faq" style="margin-top:6mm">
   <div class="q"><b>Apakah karyawan harus install aplikasi?</b><span>Tidak. Karyawan cukup membuka link di browser HP (Android atau iPhone).</span></div>
   <div class="q"><b>Bagaimana jika karyawan lupa PIN?</b><span>Admin dapat mengatur ulang PIN karyawan.</span></div>
   <div class="q"><b>Apakah ada biaya bulanan atau biaya per karyawan?</b><span>Tidak. Biayanya Rp349.000 sekali beli.</span></div>
   <div class="q"><b>Apakah data tersimpan jika HP karyawan rusak atau diganti?</b><span>Ya. Data tersimpan online di sistem, bukan di HP karyawan.</span></div>
   <div class="q"><b>Bisa dipakai untuk usaha apa saja?</b><span>Cocok untuk warung, toko, bengkel, salon, kafe, laundry, klinik, dan usaha kecil lain yang memiliki karyawan.</span></div>
  </div>
  <div class="cta"><img src="${qr}"><div><h3>Mulai sekarang</h3><div class="wa">${ic.wa}${WA}</div><p>Scan kode QR atau chat WhatsApp. Sebutkan nama usaha dan jumlah karyawan Anda.</p></div></div>
  <div class="note" style="margin-top:8mm">Penawaran berlaku 14 hari sejak ${TGL}. Harga dan ketentuan dapat berubah setelah masa berlaku. Terima kasih atas kesempatan yang diberikan.</div>`)}
</body></html>`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage();
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: OUT, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();
console.log("selesai", OUT);

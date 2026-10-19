// Carousel TikTok (mode foto 1080x1920) bergaya proposal HrCash. Jalankan: node tiktok-proposal.mjs <folder>
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
const require = createRequire(import.meta.url);
const fontDir = path.dirname(require.resolve("@fontsource/inter/package.json")) + "/files";
const font = (w) => pathToFileURL(`${fontDir}/inter-latin-${w}-normal.woff2`).href;
const img = (f) => "data:image/jpeg;base64," + readFileSync(path.resolve(f)).toString("base64");
const OUT = path.resolve(process.argv[2] ?? "./out-tt");
mkdirSync(OUT, { recursive: true });
const WA = "0812-3455-6757";
const ck = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const xx = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const wa = `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.2a12.6 12.6 0 006 1.5c7 0 12.6-5.6 12.6-12.6S23 3 16 3zm0 22.9c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.2 1.3 1.4-4-.3-.4a10.2 10.2 0 01-1.6-5.5C5.6 9.9 10.3 5.2 16 5.2s10.4 4.7 10.4 10.3S21.7 25.9 16 25.9zm5.7-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.4 8.4 0 01-4.2-3.7c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 00-.9.4 3.7 3.7 0 00-1.1 2.7c0 1.6 1.1 3.2 1.3 3.4s2.3 3.5 5.6 4.9c2 .9 2.8.9 3.8.8.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4-.3-.2-.6-.4z"/></svg>`;
const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const logo = `<div class="logo"><span class="lm">${ck}</span>HrCash</div>`;
const em = (s) => s.replace(/\*(.+?)\*/g, "<em>$1</em>");
const swipe = `<div class="swipe">Geser ${arrow}</div>`;
const phone = (f, w, h) => `<div class="phone" style="width:${w}px;height:${h}px"><div class="scr"><img src="${img(f)}"></div></div>`;

const slides = [
  // 1 cover
  { bg: "dark", n: `${logo}<div class="kick">Untuk pemilik usaha yang punya karyawan</div>
    <h1>Absen &amp; Gaji<br><em>Otomatis</em></h1>
    <div class="sub">Absen selfie + lokasi, laporan gaji, dan Portal Karyawan. Cukup dari HP karyawan.</div>
    <div class="offer"><b>Rp349.000</b><span>sekali beli, bukan langganan</span></div>
    <div class="chips"><span>Tanpa install aplikasi</span><span>Dibantu setup sampai bisa</span></div>
    <div class="grow"></div>${phone("shot-home.jpg", 400, 640)}${swipe}` },
  // 2 tantangan
  { bg: "light", n: `${logo}<h2>Tantangan yang sering <em>dihadapi owner</em></h2>
    ${["Absen tanpa bukti|Buku atau chat mudah diubah dan dititipkan.", "Rekap dan hitung gaji lama|Telat, lembur, izin, kasbon dihitung satu per satu.", "Karyawan tanya terus|Slip gaji, sisa cuti, sisa kasbon lewat chat tiap bulan.", "Biaya aplikasi per karyawan|Makin banyak tim, tagihan bulanan makin naik."].map((t) => { const [a, b] = t.split("|"); return `<div class="pain"><i>${xx}</i><div><b>${a}</b><span>${b}</span></div></div>`; }).join("")}
    <div class="quote">Waktu owner seharusnya untuk <em>usaha,</em> bukan administrasi.</div>${swipe}` },
  // 3 solusi
  { bg: "light", n: `${logo}<h2>Solusi: <em>HrCash</em></h2>
    <div class="split"><div class="col">
      ${[["1. Absen ada buktinya", ["Selfie wajah", "Lokasi di peta", "Jam otomatis", "PIN pribadi"]], ["2. Laporan gaji otomatis", ["Telat dan lembur terhitung", "Kasbon dan potongan jelas", "Slip gaji siap"]], ["3. Portal Karyawan", ["Cek slip dan sisa cuti", "Ajukan cuti dan lembur", "Papan info tim"]]].map(([h, l]) => `<div class="card"><h3>${h}</h3>${l.map((x) => `<div class="tk"><i>${ck}</i>${x}</div>`).join("")}</div>`).join("")}
    </div></div>${swipe}` },
  // 4 fitur
  { bg: "light", n: `${logo}<h2>Fitur <em>lengkap</em> dalam satu sistem</h2>
    <div class="card"><h3>Untuk karyawan (Portal)</h3><div class="tags">${["Kehadiran", "Slip gaji", "Cuti", "Lembur", "Jadwal kerja", "Reimburse", "Papan info", "Surat", "Penugasan"].map((t) => `<span>${t}</span>`).join("")}</div></div>
    <div class="card dk"><h3>Untuk owner (Dashboard)</h3>${["Ringkasan kehadiran dan gaji", "Rekap presensi bulanan", "Laporan gaji per karyawan", "Laporan PPh 21 dan iuran BPJS", "Kasbon, pinjaman, shift, KPI"].map((x) => `<div class="tk w"><i>${ck}</i>${x}</div>`).join("")}</div>${swipe}` },
  // 5 cara kerja
  { bg: "light", n: `${logo}<h2>Cara kerja: <em>mudah dan cepat</em></h2>
    ${[["Konsultasi via WhatsApp", "Ceritakan kebutuhan usaha Anda."], ["Bayar sekali beli", "Rp349.000, tanpa biaya bulanan."], ["Aktivasi dan data karyawan", "Bingung atau ada kendala? Kami bantu setup sampai Anda bisa."], ["Bagikan link ke karyawan", "Masuk dengan PIN, langsung absen selfie."], ["Laporan terkumpul otomatis", "Rekap dan laporan gaji di dashboard."]].map(([a, b], i) => `<div class="st"><span class="num">${i + 1}</span><div><b>${a}</b><span>${b}</span></div></div>`).join("")}${swipe}` },
  // 6 investasi
  { bg: "dark", n: `${logo}<h2 class="wh">Investasi: <em>sekali beli</em></h2>
    <div class="offer big"><b>Rp349.000</b><span>sekali beli, bukan langganan</span></div>
    <div class="tkc">${["Tanpa biaya bulanan", "Tanpa biaya per karyawan", "Tanpa install aplikasi", "Dibantu setup sampai bisa"].map((x) => `<div class="tk w"><i>${ck}</i>${x}</div>`).join("")}</div>
    <div class="tbl"><div class="th">Ilustrasi, 10 karyawan</div><div class="tr"><span>1 tahun</span><b class="r">Rp1.200.000</b><b class="g">Rp349.000</b></div><div class="tr"><span>3 tahun</span><b class="r">Rp3.600.000</b><b class="g">Rp349.000</b></div><div class="tc"><span></span><em>Langganan*</em><em>HrCash</em></div></div>
    <div class="fine">*Contoh: Rp10.000 per karyawan per bulan. Bukan harga pihak tertentu.</div>${swipe}` },
  // 7 demo
  { bg: "light", n: `${logo}<h2>Coba <em>demo</em> dulu</h2>
    <div class="lead">Semua data adalah data contoh.</div>
    <div class="card"><h3>Portal Karyawan</h3><div class="lnk">hr.cashimpact.id/demo-portal</div><div class="pin">Pilih nama <b>Budi Santoso</b>, PIN <b>1111</b></div></div>
    <div class="card"><h3>Dashboard Owner</h3><div class="lnk">hr.cashimpact.id/demo</div><div class="pin">Langsung masuk otomatis, tanpa daftar</div></div>
    <div class="quote">Coba sendiri dulu, <em>baru putuskan.</em></div><div class="fine dk">Ketik link di browser HP. Akun demo dipakai bersama, jangan isi data asli.</div>${swipe}` },
  // 8 CTA
  { bg: "dark", n: `${logo}<div class="grow"></div><h1 class="m">Siap <em>mulai?</em></h1>
    <div class="sub">Sebutkan nama usaha dan jumlah karyawan Anda.</div>
    <div class="offer"><b>Rp349.000</b><span>sekali beli, bukan langganan</span></div>
    <div class="cta"><span class="wi">${wa}</span><div><span>Chat WhatsApp</span><b>${WA}</b></div></div>
    <div class="help">Bingung atau ada kendala? Kami bantu setup sampai Anda bisa.</div><div class="grow"></div>` },
];

const css = `
@font-face{font-family:Inter;font-weight:400;src:url(${font(400)})}@font-face{font-family:Inter;font-weight:600;src:url(${font(600)})}@font-face{font-family:Inter;font-weight:800;src:url(${font(800)})}
:root{--b50:#f1f7fd;--b100:#e3effc;--b200:#c4d8ee;--b700:#2b5a85;--b900:#17436a;--amber:#f5a524;--ink:#10243a;--sub:#4a6580;--ok:#1f9d6b;--neg:#c2410c}
*{box-sizing:border-box;margin:0}body{width:1080px;height:1920px;font-family:Inter,sans-serif}
.p{width:1080px;height:1920px;padding:210px 64px 310px;display:flex;flex-direction:column;gap:26px;overflow:hidden;position:relative}
.dark{color:#fff;background:radial-gradient(900px 700px at 90% 0%,#3f79ad 0%,transparent 60%),linear-gradient(165deg,#1f5287,#0b2237)}.light{color:var(--ink);background:var(--b50)}
.logo{display:flex;align-items:center;gap:14px;font-weight:800;font-size:36px}.lm{width:50px;height:50px;border-radius:14px;background:var(--b700);color:#fff;display:grid;place-items:center}.dark .lm{background:#fff;color:var(--b700)}.lm svg{width:30px;height:30px}
.z>*:not(.logo):not(.swipe){zoom:1.16}.z5>*:not(.logo):not(.swipe){zoom:1.04}.grow{flex:1}.kick{font-size:34px;font-weight:600;color:var(--b200)}
h1{font-size:150px;font-weight:800;letter-spacing:-6px;line-height:.96}h1 em,h2 em,.quote em{font-style:normal;color:var(--amber)}.light h2 em{color:var(--b700)}h1.m{font-size:170px}
h2{font-size:88px;font-weight:800;letter-spacing:-3.5px;line-height:1.04}h2.wh{color:#fff}.sub{font-size:44px;font-weight:600;color:var(--b200);line-height:1.3}.lead{font-size:40px;color:var(--sub);font-weight:600}
.offer{background:var(--amber);color:#2b1a00;border-radius:34px;padding:26px 40px;align-self:flex-start}.offer b{display:block;font-size:104px;letter-spacing:-4.5px;line-height:1}.offer span{font-size:36px;font-weight:800}.offer.big b{font-size:130px}
.chips{display:flex;gap:16px;flex-wrap:wrap}.chips span{background:rgba(255,255,255,.14);border:3px solid rgba(255,255,255,.4);border-radius:99px;padding:12px 26px;font-size:32px;font-weight:800}
.phone{align-self:center;border:12px solid #0b1623;border-radius:64px;background:#0b1623;box-shadow:0 30px 70px rgba(0,0,0,.5);overflow:hidden}.scr{width:100%;height:100%;overflow:hidden;border-radius:50px;background:#fff}.scr img{width:100%;margin-top:-9%}
.swipe{position:absolute;right:64px;bottom:340px;display:flex;align-items:center;gap:12px;font-weight:800;font-size:34px;background:#fff;color:var(--b900);border-radius:99px;padding:14px 30px;box-shadow:0 12px 30px rgba(0,0,0,.2)}.swipe svg{width:32px;height:32px}
.pain{display:flex;gap:24px;align-items:center;background:#fff8f4;border:3px solid #f3d4c6;border-radius:34px;padding:28px 34px}.pain i{width:64px;height:64px;border-radius:50%;background:#fde7df;color:var(--neg);display:grid;place-items:center;padding:15px;flex:none}.pain b{display:block;font-size:46px;letter-spacing:-1px}.pain span{display:block;font-size:32px;color:var(--sub);font-weight:600;margin-top:6px;line-height:1.3}
.quote{background:var(--b900);color:#fff;border-radius:34px;padding:34px 40px;font-size:50px;font-weight:800;letter-spacing:-1.5px;line-height:1.2;margin-top:8px}
.col{display:flex;flex-direction:column;gap:22px}.card{background:#fff;border:3px solid #dbe6f1;border-radius:34px;padding:30px 36px}.card h3{font-size:46px;font-weight:800;letter-spacing:-1px;margin-bottom:12px}.card.dk{background:var(--b900);border-color:var(--b900);color:#fff}
.tk{display:flex;gap:16px;align-items:center;font-size:38px;font-weight:600;padding:7px 0}.tk i{width:36px;height:36px;border-radius:50%;background:var(--ok);color:#fff;display:grid;place-items:center;padding:8px;flex:none}.tk.w{color:#fff}
.tags{display:flex;flex-wrap:wrap;gap:12px}.tags span{background:var(--b100);color:var(--b900);font-size:34px;font-weight:800;border-radius:99px;padding:10px 24px}
.st{display:flex;gap:26px;align-items:flex-start;background:#fff;border:3px solid #dbe6f1;border-radius:34px;padding:26px 34px}.num{width:68px;height:68px;border-radius:50%;background:var(--amber);color:#2b1a00;font-weight:800;font-size:38px;display:grid;place-items:center;flex:none}.st b{display:block;font-size:44px;letter-spacing:-1px}.st span:not(.num){display:block;font-size:31px;color:var(--sub);font-weight:600;margin-top:5px;line-height:1.3}
.tkc{display:flex;flex-direction:column;gap:6px}
.tbl{background:rgba(255,255,255,.1);border-radius:30px;padding:24px 30px}.th{font-size:30px;font-weight:800;color:var(--b200);margin-bottom:8px}.tr,.tc{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;font-size:38px;font-weight:600;padding:10px 0;border-top:2px solid rgba(255,255,255,.2)}.tr b.r{color:#ffb48c}.tr b.g{color:#8ff0c4}.tc em{font-style:normal;font-size:28px;color:var(--b200);font-weight:800}
.fine{font-size:28px;color:var(--b200);font-weight:600}.fine.dk{color:var(--sub)}
.lnk{font-size:46px;font-weight:800;color:var(--b700);letter-spacing:-1px;word-break:break-all}.pin{margin-top:12px;background:var(--b50);border-radius:20px;padding:16px 22px;font-size:34px;font-weight:600}.pin b{color:var(--b900)}
.cta{display:flex;align-items:center;gap:26px;background:#fff;color:var(--b900);border-radius:40px;padding:28px 40px}.wi{width:88px;height:88px;color:#1faa59;flex:none}.cta span:not(.wi){display:block;font-size:36px;font-weight:600}.cta b{display:block;font-size:84px;letter-spacing:-2px;line-height:1.05}.help{font-size:42px;font-weight:800;line-height:1.3;color:#fff}
`;
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
for (let i = 0; i < slides.length; i++) {
  const pg = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await pg.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="p ${slides[i].bg} ${[2, 3, 5, 6].includes(i) ? "z" : i === 4 ? "z5" : ""}">${em(slides[i].n)}</div></body></html>`);
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: path.join(OUT, `tiktok-carousel-${i + 1}.png`) });
  await pg.close();
}
await browser.close();
console.log("selesai", slides.length);

// Iklan statis HrCash bergaya "perangkat + daftar fitur + harga + ajakan", dengan warna dan teks HrCash sendiri.
import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
const require = createRequire(import.meta.url);
const fontDir = path.dirname(require.resolve("@fontsource/inter/package.json")) + "/files";
const font = (w) => pathToFileURL(`${fontDir}/inter-latin-${w}-normal.woff2`).href;
const img = (f) => "data:image/jpeg;base64," + readFileSync(path.resolve(f)).toString("base64");
const OUT = path.resolve(process.argv[2] ?? "./out-style");
mkdirSync(OUT, { recursive: true });
const PHONE = "0812-3455-6757";
const I = {
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  cam: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 4l-1.5 2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2.5L15 4H9zm3 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2.2"/></svg>`,
  wallet: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6a2 2 0 012-2h11v3H6v1h13a1 1 0 011 1v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm12 7a1.3 1.3 0 100 2.600 1.3 1.3 0 000-2.600z"/></svg>`,
  doc: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h8l5 5v14a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zm7 1.5V8h4.5L13 3.5zM8 12h8v1.8H8zm0 3.5h8v1.8H8z"/></svg>`,
  cal: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h2v2h6V2h2v2h2a1 1 0 011 1v15a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h2V2zm-1 8v9h12v-9H6z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8" r="3.6"/><path d="M2.5 20c.5-4 3-6 6.500-6s6 2 6.500 6zM16 5.500a3.200 3.200 0 010 6.200M18 14c2.300.6 3.600 2.400 4 6h-4"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>`,
  mega: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 10v4h3l7 4V6L6 10H3zm13 0v4a3 3 0 000-4z"/></svg>`,
  wa: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.2a12.6 12.6 0 006 1.5c7 0 12.6-5.6 12.6-12.6S23 3 16 3zm0 22.9c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.2 1.3 1.4-4-.3-.4a10.200 10.200 0 01-1.600-5.500C5.600 9.900 10.300 5.200 16 5.200s10.400 4.700 10.400 10.300S21.700 25.900 16 25.900zm5.700-7.600c-.3-.2-1.800-.9-2.100-1s-.5-.2-.7.200-.8 1-1 1.200-.4.2-.7.100a8.400 8.400 0 01-4.200-3.700c-.3-.6.3-.5.9-1.700.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 00-.9.400 3.700 3.700 0 00-1.100 2.700c0 1.600 1.100 3.200 1.300 3.400s2.300 3.500 5.600 4.900c2 .9 2.800.9 3.800.8.600-.1 1.800-.7 2.100-1.400s.3-1.300.2-1.400-.3-.2-.6-.4z"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
};
const logoMark = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;
const logo = `<div class="logo"><span class="lm">${logoMark}</span>HrCash</div>`;
const em = (s) => s.replace(/\*(.+?)\*/g, "<em>$1</em>");

// ---- komponen ----
const phone = (shot, w, h) => `<div class="phone" style="width:${w}px;height:${h}px"><div class="notch"></div><div class="scr"><img src="${img(shot)}"></div></div>`;
const cta = `<div class="cta"><span class="wi">${I.wa}</span>Chat WhatsApp ${PHONE}<span class="ar">${I.arrow}</span></div>`;

const styleA = (d, S) => `
  ${logo}
  <div class="ha"><div class="pill">${d.h[0]}</div><div class="h2">${d.h[1]}</div><div class="h3">${d.h[2]}</div></div>
  <div class="priceA"><small>Hanya</small><b>Rp349.000</b><span>sekali beli<br>bukan langganan</span></div>
  <div class="rowA">${phone(d.shot, S.pw, S.ph)}
    <div class="box">${d.f.map(([ic, t]) => `<div class="fr"><i>${I[ic]}</i>${t}</div>`).join("")}</div></div>
  ${cta}`;

const styleB = (d, S) => `
  ${logo}
  <div class="hb"><div class="b1">${d.h[0]}</div><div class="b1">${d.h[1]}</div><div class="b2">${em(d.h[2])}</div></div>
  <div class="stageB">
    <div class="phB">${phone(d.shot, S.pw, S.ph)}</div>
    <div class="pills">${d.f.map(([ic, t], i) => `<div class="fp" style="margin-left:${[0, 36, 8, 44, 14][i % 5]}px"><i>${I[ic]}</i>${t}</div>`).join("")}</div>
  </div>
  <div class="bar"><div class="bp"><b>Rp349.000</b><span>sekali beli, bukan langganan</span></div>${cta}</div>`;

const designs = [
  { id: "gaya-a1-kontrol-kehadiran", s: "A", bg: "blue", shot: "shot-home.jpg", h: ["Kontrol Kehadiran", "Karyawan Jadi Lebih Mudah", "Dengan HrCash"], f: [["cam", "Selfie + lokasi"], ["pin", "Peta lokasi absen"], ["wallet", "Laporan gaji otomatis"]] },
  { id: "gaya-a2-tanpa-install", s: "A", bg: "navy", shot: "shot-menu.jpg", h: ["Absen Karyawan", "Tanpa Install Aplikasi", "Cukup Buka Link"], f: [["bolt", "Android dan iPhone"], ["check", "PIN 4 angka"], ["doc", "Rekap otomatis"]] },
  { id: "gaya-a3-hitung-gaji", s: "A", bg: "royal", shot: "shot-home.jpg", h: ["Hitung Gaji", "Tidak Lagi Bikin Pusing", "Dengan HrCash"], f: [["clock", "Telat terhitung"], ["bolt", "Lembur terhitung"], ["doc", "Slip gaji digital"]] },
  { id: "gaya-b1-absensi-payroll", s: "B", bg: "blue", shot: "shot-menu.jpg", h: ["Aplikasi Absensi & Payroll", "Otomatis Bikin Kerjaan HR", "*Lebih Efisien*"], f: [["clock", "Kelola absensi"], ["wallet", "Payroll otomatis"], ["doc", "Rekap dan laporan"], ["cal", "Izin dan cuti"], ["users", "Jadwal shift"]] },
  { id: "gaya-b2-portal-karyawan", s: "B", bg: "navy", shot: "shot-menu.jpg", h: ["Portal Karyawan", "Semua Urusan HR", "*Ada di Satu HP*"], f: [["doc", "Slip gaji"], ["cal", "Cuti dan izin"], ["bolt", "Pengajuan lembur"], ["clock", "Jadwal kerja"], ["mega", "Papan info"]] },
  { id: "gaya-b3-sekali-bayar", s: "B", bg: "royal", shot: "shot-home.jpg", h: ["Absensi Selfie + Lokasi", "Rekap Gaji Otomatis", "*Sekali Bayar*"], f: [["cam", "Selfie wajah"], ["pin", "Lokasi di peta"], ["clock", "Telat dan lembur"], ["wallet", "Laporan gaji"], ["bolt", "Tanpa install"]] },
];
const BG = {
  blue: "radial-gradient(900px 600px at 50% 18%,#3f79ad 0%,transparent 60%),linear-gradient(170deg,#1f5287,#0c2742)",
  navy: "radial-gradient(900px 600px at 50% 15%,#5b4a1e 0%,transparent 55%),linear-gradient(170deg,#12304f,#081a2e)",
  royal: "radial-gradient(900px 600px at 50% 18%,#4d6fc0 0%,transparent 60%),linear-gradient(170deg,#2a4d9a,#10244d)",
};
const sizes = { "1x1": 1080, "4x5": 1350, "9x16": 1920 };
const S = (name) => ({ "1x1": { pw: 250, ph: 470, f: 1 }, "4x5": { pw: 300, ph: 560, f: 1.1 }, "9x16": { pw: 400, ph: 780, f: 1.25 } })[name];
const SB = (name) => ({ "1x1": { pw: 300, ph: 520 }, "4x5": { pw: 360, ph: 700 }, "9x16": { pw: 400, ph: 760 } })[name];

const page = (d, ratio) => {
  const H = sizes[ratio]; const tall = ratio === "9x16";
  const sc = ratio === "1x1" ? 0.86 : ratio === "4x5" ? 1 : 1.12;
  const st = d.s === "A" ? S(ratio) : SB(ratio);
  const body = d.s === "A" ? styleA(d, st) : styleB(d, st);
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:400;src:url(${font(400)})}@font-face{font-family:Inter;font-weight:600;src:url(${font(600)})}@font-face{font-family:Inter;font-weight:800;src:url(${font(800)})}
:root{--amber:#f5a524;--ink:#10243a;--b200:#c4d8ee;--b700:#2b5a85;--b900:#17436a}
*{box-sizing:border-box;margin:0}body{width:1080px;height:${H}px;font-family:Inter,sans-serif}
.p{width:1080px;height:${H}px;padding:${tall ? "210px 60px 300px" : "46px 60px 40px"};display:flex;flex-direction:column;align-items:center;gap:${Math.round(18 * sc)}px;color:#fff;background:${BG[d.bg]};overflow:hidden;position:relative}
.logo{display:flex;align-items:center;gap:12px;font-weight:800;font-size:${Math.round(32 * sc)}px;opacity:.95}.lm{width:${Math.round(42 * sc)}px;height:${Math.round(42 * sc)}px;border-radius:12px;background:#fff;color:var(--b700);display:grid;place-items:center}.lm svg{width:62%;height:62%}
.ha{text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.pill{background:rgba(255,255,255,.95);color:var(--b900);font-weight:800;font-size:${Math.round(58 * sc)}px;letter-spacing:-1.5px;border-radius:99px;padding:6px 40px;box-shadow:0 10px 30px rgba(0,0,0,.25)}
.h2{font-weight:800;font-size:${Math.round(60 * sc)}px;letter-spacing:-2px;line-height:1.05}.h3{font-weight:800;font-size:${Math.round(96 * sc)}px;letter-spacing:-4px;line-height:1}
.priceA{display:flex;align-items:center;gap:16px}.priceA small{font-size:${Math.round(30 * sc)}px;font-weight:600}.priceA b{font-size:${Math.round(96 * sc)}px;letter-spacing:-4px;color:var(--amber);font-weight:800;line-height:1}.priceA span{font-size:${Math.round(28 * sc)}px;font-weight:600;line-height:1.15}
.rowA{display:flex;gap:30px;align-items:center;width:100%;justify-content:center;flex:1;min-height:0}
.phone{position:relative;border:11px solid #0b1623;border-radius:${Math.round(52)}px;background:#0b1623;box-shadow:0 30px 70px rgba(0,0,0,.5);flex:none;overflow:hidden}.scr{width:100%;height:100%;overflow:hidden;border-radius:40px;background:#fff}.scr img{width:100%;margin-top:-9%}.notch{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:34%;height:20px;border-radius:99px;background:#0b1623;z-index:2}
.box{flex:1;max-width:560px;background:rgba(0,0,0,.35);border:2px solid rgba(255,255,255,.12);border-radius:30px;padding:10px 28px}.fr{display:flex;align-items:center;gap:16px;font-size:${Math.round(34 * sc)}px;font-weight:600;padding:${Math.round(22 * sc)}px 0;border-bottom:2px solid rgba(245,165,36,.55)}.fr:last-child{border-bottom:0}.fr i{width:${Math.round(40 * sc)}px;height:${Math.round(40 * sc)}px;border-radius:50%;border:3px solid var(--amber);color:var(--amber);display:grid;place-items:center;padding:7px;flex:none}
.cta{display:flex;align-items:center;gap:16px;border:3px solid #fff;border-radius:99px;padding:${Math.round(16 * sc)}px 34px;font-weight:800;font-size:${Math.round(34 * sc)}px;background:rgba(255,255,255,.08)}.wi{width:${Math.round(42 * sc)}px;height:${Math.round(42 * sc)}px;color:#4be58a}.ar{width:${Math.round(34 * sc)}px;height:${Math.round(34 * sc)}px}
.hb{text-align:center}.b1{font-weight:800;font-size:${Math.round(68 * sc)}px;letter-spacing:-2.5px;line-height:1.06}.b2{display:inline-block;margin-top:10px;font-weight:800;font-size:${Math.round(74 * sc)}px;letter-spacing:-2.5px;border:5px solid var(--amber);padding:2px 22px;border-radius:10px}.b2 em{font-style:normal;color:#fff}
.stageB{position:relative;flex:1;width:100%;min-height:0;overflow:hidden;display:flex;align-items:flex-start;justify-content:flex-start}.phB{margin-left:${tall ? 50 : 30}px;transform:rotate(-4deg);margin-top:10px}
.pills{position:absolute;right:0;top:${Math.round(40 * sc)}px;display:flex;flex-direction:column;gap:${Math.round(20 * sc)}px;align-items:flex-start;width:56%}
.fp{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.95);color:var(--b900);font-weight:800;font-size:${Math.round(36 * sc)}px;border-radius:99px;padding:${Math.round(10 * sc)}px ${Math.round(34 * sc)}px ${Math.round(10 * sc)}px ${Math.round(12 * sc)}px;box-shadow:0 12px 30px rgba(0,0,0,.28);letter-spacing:-.6px}.fp i{width:${Math.round(58 * sc)}px;height:${Math.round(58 * sc)}px;border-radius:50%;background:var(--amber);color:#2b1a00;display:grid;place-items:center;padding:13px;flex:none}
.bar{width:calc(100% + 120px);margin:0 -60px;background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.04));padding:${Math.round(16 * sc)}px 60px ${Math.round(6 * sc)}px;display:flex;flex-direction:column;align-items:center;gap:${Math.round(14 * sc)}px;border-top:2px solid rgba(255,255,255,.2)}
.bp{display:flex;align-items:baseline;gap:18px}.bp b{font-size:${Math.round(86 * sc)}px;letter-spacing:-3.5px;color:var(--amber);font-weight:800;line-height:1}.bp span{font-size:${Math.round(32 * sc)}px;font-weight:800}
</style></head><body><div class="p">${body}</div></body></html>`;
};

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
for (const d of designs) for (const [ratio, H] of Object.entries(sizes)) {
  const pg = await browser.newPage({ viewport: { width: 1080, height: H } });
  await pg.setContent(page(d, ratio));
  await pg.evaluate(() => document.fonts.ready);
  await pg.screenshot({ path: path.join(OUT, `${d.id}-${ratio}.png`) });
  await pg.close();
}
await browser.close();
console.log("selesai", designs.length * 3);

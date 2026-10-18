// 3 gambar iklan Meta Ads (4:5 dan 9:16): harga Rp349.000 sekali beli + WhatsApp 0812-3455-6757.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import path from "node:path";
const require = createRequire(import.meta.url);
const fontDir = path.dirname(require.resolve("@fontsource/inter/package.json")) + "/files";
const font = (w) => pathToFileURL(`${fontDir}/inter-latin-${w}-normal.woff2`).href;
import { readFileSync } from "node:fs";
const shot = (f) => "data:image/jpeg;base64," + readFileSync(path.resolve(f)).toString("base64");
const OUT = path.resolve(process.argv[2] ?? "./out-ads");
mkdirSync(OUT, { recursive: true });
const PHONE = "0812-3455-6757";
const em = (s) => s.replace(/\*(.+?)\*/g, "<em>$1</em>");
const ic = {
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  cam: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 4l-1.5 2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-2.5L15 4H9zm3 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2.2"/></svg>`,
  wa: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.2a12.6 12.6 0 006 1.5c7 0 12.6-5.6 12.6-12.6S23 3 16 3zm0 22.9c-1.9 0-3.700-.5-5.300-1.500l-.4-.2-4.200 1.300 1.400-4-.3-.4a10.200 10.200 0 01-1.600-5.500C5.600 9.900 10.300 5.200 16 5.200s10.400 4.700 10.400 10.300S21.700 25.900 16 25.900zm5.700-7.600c-.3-.2-1.800-.9-2.100-1s-.5-.2-.7.200-.8 1-1 1.200-.4.2-.7.100a8.400 8.400 0 01-4.200-3.700c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6a1.200 1.200 0 00-.9.400 3.700 3.700 0 00-1.100 2.700c0 1.600 1.100 3.200 1.300 3.400s2.300 3.500 5.600 4.900c2 .9 2.800.9 3.800.8.600-.1 1.800-.7 2.100-1.400s.3-1.300.2-1.400-.3-.2-.6-.4z"/></svg>`,
};
const logo = `<div class="logo"><span class="lm">${ic.check}</span>HrCash</div>`;
const priceBox = `<div class="price"><div class="pn">Rp349.000</div><div class="pl">sekali beli, bukan langganan</div></div>`;
const waBox = `<div class="wa"><span class="wi">${ic.wa}</span><div><span>Chat WhatsApp sekarang</span><b>${PHONE}</b></div></div>`;
const small = `<div class="tiny">Tanpa biaya bulanan. Tanpa biaya per karyawan. Tanpa install aplikasi.</div>`;

const phone = (img, w) => `<div class="phone" style="width:${w}px"><div class="screen"><img src="${shot(img)}"></div></div>`;

const designs = {
  "iklan-1-penawaran": (tall) => `${logo}
    <h1>${em("Absen selfie + laporan gaji *otomatis*")}</h1>
    <div class="sub">Untuk warung, toko, bengkel, salon, dan usaha kecil lainnya.</div>
    <div class="row">${phone("shot-home.jpg", tall ? 470 : 400)}
      <div class="list">${["Absen selfie + lokasi", "Telat dan lembur terhitung", "Slip gaji dibuka karyawan", "Cukup buka link di HP"].map((t) => `<div class="li"><i>${ic.check}</i>${t}</div>`).join("")}</div></div>
    ${priceBox}${waBox}${small}`,
  "iklan-2-masalah": (tall) => `${logo}
    <h1>${em("Katanya masuk jam 8. *Buktinya mana?*")}</h1>
    <div class="sub">Absen di buku mudah diubah. Absen digital punya bukti.</div>
    <div class="chips">${[[ic.cam, "Selfie wajah"], [ic.pin, "Lokasi di peta"], [ic.clock, "Jam otomatis"]].map(([i, t]) => `<div class="chip"><i>${i}</i><b>${t}</b></div>`).join("")}</div>
    <div class="log"><div class="lh">Contoh catatan absen</div><div class="lr"><b>Budi</b><span>Check In 07:58</span><em>Tepat waktu</em></div><div class="lr"><b>Sari</b><span>Check In 08:12</span><em class="late">Telat 12 menit</em></div><div class="lr"><b>Agus</b><span>Check In 07:51</span><em>Tepat waktu</em></div></div><div class="proof">Tiga bukti dalam satu kali absen, langsung dari HP karyawan.</div>
    ${priceBox}${waBox}${small}`,
  "iklan-3-bandingkan": (tall) => `${logo}
    <h1>${em("Langganan terus, atau *sekali beli?*")}</h1>
    <div class="cmp"><div class="c bad"><div class="ct">LANGGANAN</div><div class="ci"><i>${ic.x}</i>Bayar tiap bulan</div><div class="ci"><i>${ic.x}</i>Biaya terus berjalan</div><div class="ci"><i>${ic.x}</i>Makin banyak karyawan, makin mahal</div></div>
      <div class="c good"><div class="ct">HRCASH</div><div class="ci"><i>${ic.check}</i>Sekali beli, pakai terus</div><div class="ci"><i>${ic.check}</i>Tanpa biaya bulanan</div><div class="ci"><i>${ic.check}</i>Tanpa biaya per karyawan</div></div></div>
    ${priceBox}${waBox}${small}`,
};

const page = (body, h, tall) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Inter;font-weight:400;src:url(${font(400)})}@font-face{font-family:Inter;font-weight:600;src:url(${font(600)})}@font-face{font-family:Inter;font-weight:800;src:url(${font(800)})}
:root{--b100:#e3effc;--b200:#c4d8ee;--b600:#3b6a97;--b700:#2b5a85;--b900:#17436a;--amber:#f5a524;--ink:#10243a;--ok:#1f9d6b;--neg:#c2410c}
*{box-sizing:border-box;margin:0}body{width:1080px;height:${h}px;font-family:Inter,sans-serif}
.p{width:1080px;height:${h}px;padding:${tall ? "230px 72px 300px" : "56px 72px 44px"};display:flex;flex-direction:column;gap:${tall ? 28 : 18}px;color:#fff;background:radial-gradient(900px 700px at 90% -10%,#3b6a97 0%,transparent 60%),linear-gradient(160deg,#17436a,#0f2f4d);overflow:hidden}
.logo{display:flex;align-items:center;gap:14px;font-weight:800;font-size:34px}.lm{width:46px;height:46px;border-radius:13px;background:#fff;color:var(--b700);display:grid;place-items:center}.lm svg{width:28px;height:28px}
h1{font-size:${tall ? 88 : 70}px;line-height:1.04;letter-spacing:-3px;font-weight:800}h1 em{font-style:normal;color:var(--amber)}
.sub{font-size:${tall ? 36 : 28}px;color:var(--b200);font-weight:600;line-height:1.3}
.row{display:flex;gap:34px;align-items:center;flex:1}.phone{border:12px solid #0b1f33;border-radius:60px;background:#0b1f33;box-shadow:0 30px 70px rgba(0,0,0,.45);flex:none;overflow:hidden}.screen{height:${tall ? 540 : 380}px;overflow:hidden;border-radius:46px;background:#fff}.screen img{width:100%;margin-top:-11%}
.list{display:flex;flex-direction:column;gap:22px;flex:1}.li{display:flex;gap:14px;align-items:center;font-size:${tall ? 38 : 30}px;font-weight:800;line-height:1.15;letter-spacing:-.5px}.li i{width:48px;height:48px;border-radius:50%;background:var(--amber);color:#2b1a00;display:grid;place-items:center;padding:11px;flex:none}
.chips{display:flex;gap:20px;margin-top:6px}.chip{flex:1;background:#fff;color:var(--ink);border-radius:28px;padding:22px 10px;text-align:center;box-shadow:0 16px 36px rgba(0,0,0,.25)}.chip i{display:block;width:76px;height:76px;margin:0 auto 14px;color:var(--b600);background:var(--b100);border-radius:22px;padding:18px}.chip b{font-size:${tall ? 38 : 34}px;font-weight:800;letter-spacing:-1px}
.proof{font-size:${tall ? 38 : 30}px;font-weight:800;line-height:1.25;color:#fff;flex:1;display:flex;align-items:center}
.cmp{display:flex;flex-direction:column;gap:20px;flex:1}.c{border-radius:30px;padding:20px 30px;background:#fff;color:var(--ink);box-shadow:0 16px 36px rgba(0,0,0,.25)}.c.good{background:var(--amber);color:#2b1a00}.ct{font-size:28px;font-weight:800;letter-spacing:3px;margin-bottom:10px;opacity:.75}
.ci{display:flex;gap:14px;align-items:center;font-size:${tall ? 40 : 32}px;font-weight:800;letter-spacing:-1px;padding:8px 0}.ci i{width:42px;height:42px;flex:none;border-radius:50%;display:grid;place-items:center;padding:9px}.bad .ci i{background:#fde7df;color:var(--neg)}.good .ci i{background:#2b1a00;color:var(--amber)}
.price{background:var(--amber);color:#2b1a00;border-radius:38px;padding:${tall ? "26px 36px" : "16px 30px"};text-align:center}.pn{font-size:${tall ? 118 : 96}px;font-weight:800;letter-spacing:-5px;line-height:1}.pl{font-size:${tall ? 40 : 34}px;font-weight:800;margin-top:6px}
.wa{display:flex;align-items:center;justify-content:center;gap:22px;background:#fff;color:var(--b900);border-radius:34px;padding:14px 26px}.wi{width:64px;height:64px;color:#1faa59;flex:none}.wa span{display:block;font-size:26px;font-weight:600}.wa b{display:block;font-size:${tall ? 60 : 54}px;font-weight:800;letter-spacing:-1px;line-height:1.1}
.log{background:#fff;color:var(--ink);border-radius:30px;padding:20px 28px;box-shadow:0 16px 36px rgba(0,0,0,.25)}.lh{font-size:24px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--b600);margin-bottom:6px}.lr{display:flex;align-items:center;gap:16px;border-top:3px solid #e6eef6;padding:12px 0;font-size:${tall ? 36 : 30}px}.lr b{flex:none;width:130px;font-weight:800}.lr span{flex:1;color:#4a6580;font-weight:600}.lr em{font-style:normal;font-weight:800;color:var(--ok);font-size:${tall ? 30 : 26}px}.lr em.late{color:var(--neg)}
.tiny{font-size:24px;color:var(--b200);text-align:center;font-weight:600}
</style></head><body><div class="p">${body}</div></body></html>`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
for (const [name, fn] of Object.entries(designs)) {
  for (const [suf, h, tall] of [["4x5", 1350, false], ["9x16", 1920, true]]) {
    const pg = await browser.newPage({ viewport: { width: 1080, height: h } });
    await pg.setContent(page(fn(tall), h, tall).replace(/<em>/g, "<em>"));
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: path.join(OUT, `${name}-${suf}.png`) });
    await pg.close();
  }
}
await browser.close();
console.log("selesai");

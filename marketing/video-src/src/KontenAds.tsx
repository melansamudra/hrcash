import { Cfg } from "./Kreasi";

type Sc = Cfg["scenes"][number];
const C = (head: string, items: [string, string][]): Sc => ({ k: "cards", head, items });
const T = (head: string, items: [string, string][]): Sc => ({ k: "ticks", head, items });
const S = (head: string, ...l: string[]): Sc => ({ k: "steps", head, items: l.map((label, i) => ({ icon: (["user", "check", "cam"] as const)[i % 3], label })) });
const M = (head: string, msgs: { who?: string; text: string; time: string; out?: boolean }[]): Sc => ({ k: "chat", head, msgs });
const X = (head: string, bad: string[], good: string): Sc => ({ k: "cross", head, bad, good });
const B = (head: string, text: string, label: string, sub?: string): Sc => ({ k: "big", head, text, label, sub });
const V = (head: string, tagOld: string, old: [string, string], tagNow: string, now: [string, string]): Sc => ({ k: "versus", head, tagOld, old, tagNow, now });
const PH = (head: string): Sc => ({ k: "phone", head });
const SL = (head: string): Sc => ({ k: "slip", head });
const R = (head: string, part: "pin" | "map" | "selfie", cap: string): Sc => ({ k: "rec", head, part, cap });
const ad = (id: string, theme: Cfg["theme"], line: string, scenes: Sc[]): Cfg => ({ id, theme, end: "iklan", line, scenes });

// 10 video iklan Meta Ads (22-26 dtk): hook kuat, demo aplikasi asli, penutup harga + WhatsApp.
export const CONFIGS_ADS: Cfg[] = [
  ad("AD01-buktinya-mana", "dark", "Absen yang ada buktinya.", [
    M("Katanya masuk jam 8. *Buktinya mana?*", [{ who: "Budi", text: "Saya sudah masuk jam 8 kok, Pak.", time: "09:14" }, { text: "Buktinya apa?", time: "09:15", out: true }, { who: "Budi", text: "Hmm... ada di buku absen.", time: "09:16" }]),
    X("Buku absen *bukan bukti yang kuat*", ["Bisa ditulis ulang", "Bisa dititipkan", "Tanpa lokasi dan jam asli"], "Selfie + lokasi + jam otomatis"),
    R("Absen *selfie + lokasi*", "selfie", "Foto saat absen"),
    T("Jelas untuk *dua pihak*", [["Jam masuk", "tercatat otomatis"], ["Lokasi", "terlihat di peta"], ["Rekap gaji", "otomatis"]]),
  ]),
  ad("AD02-titip-absen", "dark", "Titip absen jadi susah.", [
    M("Titip absen? *Susah kalau wajib selfie.*", [{ who: "Agus", text: "Bro, absenin aku dulu ya.", time: "07:41" }, { who: "Rina", text: "Nggak bisa, harus selfie di lokasi.", time: "07:42" }]),
    S("3 lapis *pengaman absen*", "Selfie wajah", "Lokasi dicek", "PIN pribadi"),
    R("Lokasi *terbaca otomatis*", "map", "Titik biru = posisi karyawan"),
    T("Absen *jujur,* hasil jelas", [["Karyawan", "tidak bisa dititipkan"], ["Owner", "tidak perlu curiga"], ["Rekap", "otomatis"]]),
  ]),
  ad("AD03-rekap-malam", "dark", "Rekap absen tanpa begadang.", [
    B("Rekap absen *sampai jam 23.30?*", "23:30", "masih merekap absen", "Padahal bisa otomatis."),
    X("Yang bikin *rekap lama*", ["Catat satu per satu", "Hitung telat manual", "Cek ulang kalau salah"], "Rekap otomatis dari data absen"),
    R("Absen *cuma 15 detik*", "pin", "Ketik 4 angka PIN"),
    SL("Laporan gaji *jadi sendiri.*"),
  ]),
  ad("AD04-gaji-dikomplain", "light", "Gaji jelas, tidak ada debat.", [
    M("Gaji dikomplain tiap bulan? *Cukup tunjukkan slipnya.*", [{ who: "Rina", text: "Pak, kok gaji saya kurang?", time: "09:03" }, { who: "Agus", text: "Potongannya apa saja, Pak?", time: "09:05" }]),
    SL("Rincian *jelas dan terbuka.*"),
    PH("Karyawan *cek sendiri* di HP."),
    T("Hasilnya", [["Salah paham", "berkurang"], ["Hitungan", "dari data absen"], ["Slip", "tersimpan tiap bulan"]]),
  ]),
  ad("AD05-stop-langganan", "dark", "Sekali beli, pakai terus.", [
    V("Bayar langganan absen tiap bulan? *Cukup sekali.*", "LANGGANAN", ["Bayar tiap bulan", "biaya terus berjalan"], "SEKALI BELI", ["Satu kali bayar", "tanpa biaya bulanan"]),
    C("Yang *kamu dapat*", [["Absen", "Selfie + lokasi + jam"], ["Rekap", "Lembur dan telat otomatis"], ["Portal Karyawan", "Slip, cuti, lembur dari HP"]]),
    R("Lokasi *terbaca otomatis*", "map", "Tanpa alat tambahan"),
    T("Tanpa ribet", [["Tanpa install", "cukup buka link"], ["Tanpa mesin", "cukup HP"], ["Tanpa biaya bulanan", "sekali beli"]]),
  ]),
  ad("AD06-bukan-per-orang", "amber", "Satu harga, berapa pun karyawannya.", [
    C("5 karyawan atau 20 karyawan: *tetap satu harga*", [["5 karyawan", "Sekali beli"], ["10 karyawan", "Sekali beli"], ["20 karyawan", "Sekali beli"]]),
    V("Bandingkan *cara bayarnya*", "PER ORANG", ["Makin banyak karyawan", "makin mahal tiap bulan"], "SEKALI BELI", ["Satu harga", "tanpa biaya per karyawan"]),
    PH("Semua karyawan *pakai satu link.*"),
    T("Cocok untuk *usaha kecil*", [["Warung, toko, bengkel", "kafe, salon, laundry"], ["Owner sibuk", "laporan otomatis"], ["Tanpa tim IT", "tinggal pakai"]]),
  ]),
  ad("AD07-owner-begadang", "dark", "Owner tidur lebih tenang.", [
    B("Owner begadang hitung gaji. *Padahal bisa otomatis.*", "23:30", "masih menghitung gaji", "Besok pagi harus buka toko."),
    V("Mana yang *kamu pilih?*", "MALAM HARI", ["Hitung manual", "sampai larut"], "SEKARANG", ["Laporan siap", "dari data absen"]),
    SL("Slip dan laporan *siap.*"),
    R("Karyawan absen *sendiri*", "selfie", "Selfie, Check In"),
  ]),
  ad("AD08-lima-belas-detik", "dark", "Absen cepat, rekap otomatis.", [
    R("Absen karyawan *cuma 15 detik*", "pin", "1. Ketik PIN"),
    R("Lokasi *terbaca otomatis*", "map", "2. Lokasi di peta"),
    R("Lalu *selfie,* selesai", "selfie", "3. Check In tercatat"),
    T("Setelah itu *jalan sendiri*", [["Rekap absen", "otomatis"], ["Lembur dan telat", "terhitung"], ["Slip gaji", "siap"]]),
  ]),
  ad("AD09-gajian-tanpa-pusing", "amber", "Tanggal gajian tanpa pusing.", [
    B("Tanggal gajian *tanpa pusing*", "25", "hari gajian", "Laporan gaji sudah siap."),
    C("Dari absen sampai slip, *jalan sendiri*", [["Absen", "Selfie dan lokasi"], ["Lembur dan telat", "Terhitung otomatis"], ["Slip gaji", "Siap dibuka karyawan"]]),
    SL("Tinggal *cek dan bayar.*"),
    PH("Karyawan *cek sendiri.*"),
  ]),
  ad("AD10-harga-di-awal", "dark", "Absen digital, sekali beli.", [
    B("Absen digital *sekali beli.* Bukan langganan.", "Rp349rb", "sekali beli, bukan langganan", "Absen selfie + lokasi + laporan gaji otomatis."),
    C("Isi *paketnya*", [["Absen selfie + lokasi", "Bukti jelas tiap hari"], ["Laporan gaji otomatis", "Lembur dan telat terhitung"], ["Portal Karyawan", "Slip, cuti, lembur di HP"]]),
    R("Begini *tampilannya*", "selfie", "Absen dari HP karyawan"),
    T("Tanpa ribet", [["Tanpa install", "cukup buka link"], ["Tanpa biaya bulanan", "sekali beli"], ["Tanpa biaya per karyawan", "satu harga"]]),
  ]),
];

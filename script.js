// Nomor WhatsApp panitia (format internasional, tanpa + dan 0 di depan)
const NOMOR_PANITIA = "6285693677290";

const BENEFIT = {
  Universitas: [
    "Booth pameran di area Expo Kampus",
    "Akses langsung ke siswa kelas XI dan XII",
    "Sesi presentasi program studi dan beasiswa",
    "Konsumsi dan sertifikat partisipasi"
  ],
  Perusahaan: [
    "Booth rekrutmen di area Career Booth",
    "Kesempatan seleksi awal calon magang dan kerja",
    "Slot sharing session di workshop",
    "Konsumsi dan sertifikat partisipasi"
  ],
  Alumni: [
    "Slot sharing pengalaman karier dan kuliah",
    "Sesi networking dengan guru dan adik kelas",
    "Konsumsi dan sertifikat pembicara"
  ],
  Guru: [
    "Akses ke seluruh area expo dan career booth",
    "Informasi jalur kuliah dan karier untuk siswa",
    "Sesi workshop dan sharing session",
    "Konsumsi dan sertifikat kehadiran"
  ],
  Umum: [
    "Akses ke seluruh area expo",
    "Sesi workshop dan sharing session",
    "Konsumsi selama acara"
  ]
};

// Nilai bawaan HANYA untuk tampilan cover saat link dibuka tanpa ?to=
// (kolom RSVP tidak ikut terisi)
const DEFAULT_NAMA = "Dinda Nurrahma, S.Pd.";
const DEFAULT_INSTANSI = "SMK Negeri 6 Kota Tangerang Selatan";
const DEFAULT_KATEGORI = "Guru";

const params = new URLSearchParams(window.location.search);
const nama = (params.get("to") || "").trim();
const instansi = (params.get("instansi") || "").trim();
const kategori = (params.get("kategori") || "").trim();

// yang ditampilkan di cover
const adaLink = params.has("to");
const tampilNama = nama || DEFAULT_NAMA;
const tampilInstansi = adaLink ? instansi : (instansi || DEFAULT_INSTANSI);
const tampilKategori = adaLink ? kategori : (kategori || DEFAULT_KATEGORI);

// textContent dipakai agar isi URL tidak dibaca sebagai HTML
document.getElementById("coverNama").textContent = tampilNama;
if (nama) {
  document.getElementById("rsvpNama").value = nama;
  document.title = "Undangan untuk " + nama + " | Edu Fair & Career Day 2026";
}

if (tampilInstansi) {
  const el = document.getElementById("coverInstansi");
  el.textContent = tampilInstansi;
  el.hidden = false;
}
if (tampilKategori) {
  const chip = document.getElementById("coverKategori");
  chip.textContent = tampilKategori;
  chip.hidden = false;
}

const kunci = Object.keys(BENEFIT).find(k => k.toLowerCase() === tampilKategori.toLowerCase()) || "Umum";
const daftar = document.getElementById("benefit");
BENEFIT[kunci].forEach(teks => {
  const li = document.createElement("li");
  li.textContent = teks;
  daftar.appendChild(li);
});

document.getElementById("btnBuka").addEventListener("click", () => {
  document.getElementById("cover").hidden = true;
  document.getElementById("isi").hidden = false;
  window.scrollTo(0, 0);
});

document.getElementById("rsvpForm").addEventListener("submit", e => {
  e.preventDefault();
  const namaTamu = document.getElementById("rsvpNama").value.trim();
  const status = document.getElementById("rsvpStatus").value;
  const catatan = document.getElementById("rsvpCatatan").value.trim();

  const keterangan = status === "hadir" ? "*HADIR*" : "*TIDAK DAPAT HADIR*";
  let pesan = "Halo Panitia Edu Fair & Career Day 2026,\n\n" +
    "Saya " + namaTamu + (kategori ? " (" + kategori + ")" : "") +
    " mengonfirmasi " + keterangan + " pada acara tanggal 25–26 November 2026.";
  if (catatan) pesan += "\n\nCatatan: " + catatan;
  pesan += "\n\nTerima kasih.";

  window.open("https://wa.me/" + NOMOR_PANITIA + "?text=" + encodeURIComponent(pesan), "_blank");
});
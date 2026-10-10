const STORAGE_KEY = "keranjangMiniPOS";
const MIN_DISKON = 50000;
let keranjang = [];

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

// Serialisasi: array -> string JSON
function simpanKeranjang() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
}

// Deserialisasi: string JSON -> array
function muatKeranjang() {
  const data = localStorage.getItem(STORAGE_KEY);
  keranjang = data ? JSON.parse(data) : [];
}

function tampilkanError(idInput, pesan) {
  document.getElementById("error-" + idInput).textContent = pesan;
  document.getElementById(idInput).classList.toggle("invalid", pesan !== "");
}

function validasiForm() {
  const nama = document.getElementById("nama").value.trim();
  const harga = document.getElementById("harga").valueAsNumber;
  const qty = document.getElementById("qty").valueAsNumber;
  let valid = true;

  if (nama.length < 3) {
    tampilkanError("nama", "Nama barang wajib diisi, minimal 3 karakter.");
    valid = false;
  } else tampilkanError("nama", "");

  if (isNaN(harga) || harga < 500) {
    tampilkanError("harga", "Harga wajib angka dan minimal Rp 500.");
    valid = false;
  } else tampilkanError("harga", "");

  if (isNaN(qty) || !Number.isInteger(qty) || qty < 1) {
    tampilkanError("qty", "Jumlah wajib bilangan bulat minimal 1.");
    valid = false;
  } else tampilkanError("qty", "");

  return valid ? { nama, harga, qty } : null;
}

document.getElementById("form-barang").addEventListener("submit", function (e) {
  e.preventDefault();                 // cegah reload halaman
  const data = validasiForm();
  if (!data) return;                  // tidak valid -> berhenti, tidak masuk keranjang

  keranjang.push({ id: Date.now(), ...data });
  this.reset();                       // reset form jika sukses
  perbarui();
});

function hapusItem(id) {
  keranjang = keranjang.filter(item => item.id !== id);
  perbarui();
}

function escapeHTML(teks) {
  const div = document.createElement("div");
  div.textContent = teks;
  return div.innerHTML;
}

function renderTabel() {
  const tbody = document.getElementById("tabel-body");
  if (keranjang.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Keranjang masih kosong.</td></tr>';
    return;
  }
  tbody.innerHTML = keranjang.map((item, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${escapeHTML(item.nama)}</td>
      <td class="angka">${formatRupiah(item.harga)}</td>
      <td class="angka">${item.qty}</td>
      <td class="angka">${formatRupiah(item.harga * item.qty)}</td>
      <td><button class="danger" onclick="hapusItem(${item.id})">Hapus</button></td>
    </tr>`).join("");
}

function hitungRingkasan() {
  const total = keranjang.reduce((jumlah, item) => jumlah + item.harga * item.qty, 0);

  const kode = document.getElementById("kode-promo").value.trim().toUpperCase();
  let diskon = 0;
  if (total >= MIN_DISKON || kode === "HEMAT10") {
    diskon = total * 0.1;
  }
  const totalAkhir = total - diskon;

  document.getElementById("total-belanja").textContent = formatRupiah(total);
  document.getElementById("diskon").textContent = formatRupiah(diskon);
  document.getElementById("total-akhir").textContent = formatRupiah(totalAkhir);

  hitungKembalian(totalAkhir);
}

function hitungKembalian(totalAkhir) {
  const el = document.getElementById("kembalian");
  const bayar = document.getElementById("uang-bayar").valueAsNumber;

  if (isNaN(bayar)) { el.textContent = "-"; el.className = ""; return; }

  if (bayar < totalAkhir) {
    el.textContent = "Uang belum mencukupi (kurang " + formatRupiah(totalAkhir - bayar) + ")";
    el.className = "kurang";
  } else {
    el.textContent = formatRupiah(bayar - totalAkhir);
    el.className = "cukup";
  }
}

function perbarui() {
  simpanKeranjang();
  renderTabel();
  hitungRingkasan();
}

document.getElementById("kode-promo").addEventListener("input", hitungRingkasan);
document.getElementById("uang-bayar").addEventListener("input", hitungRingkasan);

document.getElementById("btn-reset").addEventListener("click", function () {
  if (!confirm("Kosongkan keranjang dan mulai transaksi baru?")) return;
  keranjang = [];
  localStorage.removeItem(STORAGE_KEY);
  document.getElementById("kode-promo").value = "";
  document.getElementById("uang-bayar").value = "";
  perbarui();
});

// Dijalankan saat halaman dibuka/refresh
muatKeranjang();
renderTabel();
hitungRingkasan();
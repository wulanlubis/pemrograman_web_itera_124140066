# ==============================================================================
# Berkas: latihan_kasir.py
# Latihan Mandiri (Bab 1): Pemodelan Entitas Sistem Kasir Toko Online
# ==============================================================================
#
# ENTITAS 1: Produk
#   Atribut : kode_produk, nama, harga, stok
#   Metode  : kurangi_stok(jumlah), tampilkan_info()
#
# ENTITAS 2: Keranjang
#   Atribut : pemilik, daftar_item (list of (Produk, jumlah)), tanggal_dibuat
#   Metode  : tambah_produk(produk, jumlah), hitung_total()
#
# ENTITAS 3: Pengguna
#   Atribut : id_pengguna, nama, email, alamat
#   Metode  : checkout(keranjang), ubah_alamat(alamat_baru)

class Produk:
    def __init__(self, kode_produk, nama, harga, stok):
        self.kode_produk = kode_produk
        self.nama = nama
        self.harga = harga
        self.stok = stok

    def kurangi_stok(self, jumlah):
        if jumlah > self.stok:
            raise ValueError(f"Stok {self.nama} tidak cukup (sisa {self.stok})")
        self.stok -= jumlah

    def tampilkan_info(self):
        print(f"[{self.kode_produk}] {self.nama} - Rp {self.harga:,} (stok: {self.stok})")


class Keranjang:
    def __init__(self, pemilik):
        self.pemilik = pemilik
        self.daftar_item = []

    def tambah_produk(self, produk, jumlah):
        self.daftar_item.append((produk, jumlah))

    def hitung_total(self):
        return sum(p.harga * j for p, j in self.daftar_item)


class Pengguna:
    def __init__(self, id_pengguna, nama, email, alamat):
        self.id_pengguna = id_pengguna
        self.nama = nama
        self.email = email
        self.alamat = alamat

    def ubah_alamat(self, alamat_baru):
        self.alamat = alamat_baru

    def checkout(self, keranjang):
        for produk, jumlah in keranjang.daftar_item:
            produk.kurangi_stok(jumlah)
        total = keranjang.hitung_total()
        print(f"{self.nama} checkout. Total: Rp {total:,}")
        return total


if __name__ == "__main__":
    laptop = Produk("P01", "Laptop", 8000000, 5)
    mouse = Produk("P02", "Mouse", 150000, 20)
    user = Pengguna(1, "Andi", "andi@mail.com", "Bandar Lampung")
    k = Keranjang(user)
    k.tambah_produk(laptop, 1)
    k.tambah_produk(mouse, 2)
    user.checkout(k)
    laptop.tampilkan_info()
    mouse.tampilkan_info()

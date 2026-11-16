"""
main.py
Skrip uji seluruh fungsionalitas sistem perpustakaan.
Jalankan: python main.py
"""
from library_item import Book, Magazine
from library import Library
from member import Member


def main():
    perpus = Library("Perpustakaan ITERA")

    print("--- 1. Menambahkan Item ---")
    perpus.tambah_item(Book("B001", "Pemrograman Python", 2022, "Budi Santoso", 320))
    perpus.tambah_item(Book("B002", "Dasar Algoritma", 2020, "Siti Rahma", 250))
    perpus.tambah_item(Magazine("M001", "Tech Monthly", 2026, "Edisi November", "Penerbit Teknologi"))
    perpus.tambah_item(Magazine("M002", "Sains Populer", 2025, "Edisi Juli", "Penerbit Sains"))
    perpus.tambah_item(Book("B001", "ID Duplikat", 2021, "Anonim", 100))  # ditolak

    print("\n--- 2. Katalog Tersedia ---")
    perpus.tampilkan_tersedia()

    print("\n--- 3. Pencarian ---")
    hasil = perpus.cari_by_judul("python")
    print("Cari judul 'python':", [i.judul for i in hasil])
    item = perpus.cari_by_id("M001")
    print("Cari id 'M001':", item.get_detail() if item else "Tidak ditemukan")
    print("Cari id 'X999':", perpus.cari_by_id("X999"))

    print("\n--- 4. Peminjaman & Status Ketersediaan ---")
    andi = Member("A01", "Andi")
    perpus.pinjam_item("B001", andi)
    perpus.pinjam_item("B001", andi)  # sudah dipinjam
    perpus.pinjam_item("M001", andi)
    perpus.tampilkan_semua()
    perpus.tampilkan_tersedia()

    print("\n--- 5. Pengembalian & Denda (Polymorphism) ---")
    perpus.kembalikan_item("B001", andi, hari_telat=3)   # buku: 1000/hari
    perpus.kembalikan_item("M001", andi, hari_telat=3)   # majalah: 500/hari
    perpus.tampilkan_semua()

    print("\n--- 6. Uji Encapsulation ---")
    buku = perpus.cari_by_id("B002")
    try:
        buku.is_dipinjam = True  # property read-only
    except AttributeError:
        print("is_dipinjam bersifat read-only (AttributeError).")
    print("Total item di perpustakaan:", len(perpus))


if __name__ == "__main__":
    main()

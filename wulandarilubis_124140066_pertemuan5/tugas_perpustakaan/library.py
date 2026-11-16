"""
library.py
Berisi class Library untuk mengelola koleksi item perpustakaan.
"""
from library_item import LibraryItem
from member import Member


class Library:
    """Mengelola koleksi item, pencarian, dan peminjaman."""

    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi = {}  # private: {item_id: LibraryItem}

    def tambah_item(self, item: LibraryItem) -> bool:
        """Menambahkan item. Ditolak jika id sudah ada."""
        if item.item_id in self.__koleksi:
            print(f"Gagal: ID {item.item_id} sudah terdaftar!")
            return False
        self.__koleksi[item.item_id] = item
        print(f"Berhasil menambahkan: {item.judul}")
        return True

    def tampilkan_tersedia(self) -> None:
        """Menampilkan daftar item yang tersedia (tidak dipinjam)."""
        print(f"\n=== Katalog Tersedia - {self.nama} ===")
        tersedia = [i for i in self.__koleksi.values() if not i.is_dipinjam]
        if not tersedia:
            print("(tidak ada item tersedia)")
        for item in tersedia:
            print(" -", item.get_detail())  # polymorphism

    def tampilkan_semua(self) -> None:
        """Menampilkan seluruh koleksi beserta status."""
        print(f"\n=== Seluruh Koleksi - {self.nama} ===")
        for item in self.__koleksi.values():
            print(" -", item)

    def cari_by_id(self, item_id: str):
        """Mencari item berdasarkan id. None jika tidak ada."""
        return self.__koleksi.get(item_id)

    def cari_by_judul(self, kata_kunci: str) -> list:
        """Mencari item berdasarkan judul (tidak case-sensitive, sebagian kata)."""
        kunci = kata_kunci.lower()
        return [i for i in self.__koleksi.values() if kunci in i.judul.lower()]

    def pinjam_item(self, item_id: str, member: Member) -> bool:
        """Meminjamkan item ke member."""
        item = self.cari_by_id(item_id)
        if item is None:
            print(f"Gagal: item {item_id} tidak ditemukan.")
            return False
        if item.is_dipinjam:
            print(f"Gagal: '{item.judul}' sedang dipinjam.")
            return False
        if not member.tambah_pinjaman(item):
            print(f"Gagal: {member.nama} sudah mencapai batas {Member.MAKS_PINJAM} pinjaman.")
            return False
        item.pinjam()
        print(f"{member.nama} berhasil meminjam '{item.judul}'.")
        return True

    def kembalikan_item(self, item_id: str, member: Member, hari_telat: int = 0) -> float:
        """Mengembalikan item dan mengembalikan nilai denda (0 jika tepat waktu)."""
        item = self.cari_by_id(item_id)
        if item is None or item not in member.daftar_pinjaman():
            print("Gagal: item tidak ada dalam daftar pinjaman member.")
            return 0.0
        item.kembalikan()
        member.hapus_pinjaman(item)
        denda = item.hitung_denda(hari_telat)  # polymorphism
        print(f"{member.nama} mengembalikan '{item.judul}'. Denda: Rp {denda:,.0f}")
        return denda

    def __len__(self) -> int:
        return len(self.__koleksi)

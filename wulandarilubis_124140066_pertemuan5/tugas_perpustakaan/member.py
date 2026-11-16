"""
member.py
Berisi class Member (anggota perpustakaan).
"""


class Member:
    """Anggota perpustakaan yang dapat meminjam item (maks. 3)."""
    MAKS_PINJAM = 3

    def __init__(self, member_id: str, nama: str):
        self.__member_id = member_id
        self._nama = nama
        self.__pinjaman = []  # private: daftar item yang sedang dipinjam

    @property
    def member_id(self) -> str:
        return self.__member_id

    @property
    def nama(self) -> str:
        return self._nama

    @property
    def jumlah_pinjaman(self) -> int:
        return len(self.__pinjaman)

    def tambah_pinjaman(self, item) -> bool:
        """Mencatat item pinjaman. False jika kuota penuh."""
        if len(self.__pinjaman) >= self.MAKS_PINJAM:
            return False
        self.__pinjaman.append(item)
        return True

    def hapus_pinjaman(self, item) -> None:
        """Menghapus item dari daftar pinjaman."""
        if item in self.__pinjaman:
            self.__pinjaman.remove(item)

    def daftar_pinjaman(self) -> list:
        """Mengembalikan salinan daftar pinjaman."""
        return list(self.__pinjaman)

    def __str__(self) -> str:
        return f"Member {self.__member_id} - {self._nama} ({self.jumlah_pinjaman} pinjaman)"

"""
library_item.py
Berisi abstract class LibraryItem beserta subclass Book dan Magazine.
"""
from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract class dasar untuk semua item perpustakaan."""

    def __init__(self, item_id: str, judul: str, tahun: int):
        self.__item_id = item_id        # private: id tidak boleh diubah dari luar
        self._judul = judul             # protected: boleh diakses subclass
        self._tahun = tahun             # protected
        self.__dipinjam = False         # private: status hanya diubah via pinjam()/kembalikan()

    # ---------- PROPERTY ----------
    @property
    def item_id(self) -> str:
        """Getter id item (read-only)."""
        return self.__item_id

    @property
    def judul(self) -> str:
        """Getter judul item."""
        return self._judul

    @property
    def is_dipinjam(self) -> bool:
        """Getter status peminjaman (read-only)."""
        return self.__dipinjam

    @property
    def tahun(self) -> int:
        """Getter tahun terbit."""
        return self._tahun

    @tahun.setter
    def tahun(self, nilai: int):
        """Setter tahun terbit dengan validasi."""
        if not isinstance(nilai, int) or nilai < 1000 or nilai > 2100:
            raise ValueError("Tahun terbit tidak valid!")
        self._tahun = nilai

    # ---------- METHOD ABSTRACT (wajib di-override subclass) ----------
    @abstractmethod
    def hitung_denda(self, hari_telat: int) -> float:
        """Menghitung denda keterlambatan pengembalian."""

    @abstractmethod
    def get_detail(self) -> str:
        """Mengembalikan detail lengkap item."""

    # ---------- METHOD CONCRETE ----------
    def pinjam(self) -> bool:
        """Menandai item sebagai dipinjam. False jika sudah dipinjam."""
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    def kembalikan(self) -> bool:
        """Menandai item sebagai tersedia. False jika memang tidak dipinjam."""
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    def __str__(self) -> str:
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self.__item_id}] {self._judul} ({self._tahun}) - {status}"


class Book(LibraryItem):
    """Subclass untuk buku."""
    DENDA_PER_HARI = 1000

    def __init__(self, item_id: str, judul: str, tahun: int, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun)
        self._penulis = penulis
        self._jumlah_halaman = jumlah_halaman

    def hitung_denda(self, hari_telat: int) -> float:
        """Denda buku: Rp 1.000 per hari."""
        return max(0, hari_telat) * self.DENDA_PER_HARI

    def get_detail(self) -> str:
        return (f"BUKU     | {self.judul} | Penulis: {self._penulis} | "
                f"{self._jumlah_halaman} hlm | Tahun: {self.tahun}")


class Magazine(LibraryItem):
    """Subclass untuk majalah."""
    DENDA_PER_HARI = 500

    def __init__(self, item_id: str, judul: str, tahun: int, edisi: str, penerbit: str):
        super().__init__(item_id, judul, tahun)
        self._edisi = edisi
        self._penerbit = penerbit

    def hitung_denda(self, hari_telat: int) -> float:
        """Denda majalah: Rp 500 per hari."""
        return max(0, hari_telat) * self.DENDA_PER_HARI

    def get_detail(self) -> str:
        return (f"MAJALAH  | {self.judul} | Edisi: {self._edisi} | "
                f"Penerbit: {self._penerbit} | Tahun: {self.tahun}")

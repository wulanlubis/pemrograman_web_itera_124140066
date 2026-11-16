# ==============================================================================
# Berkas: latihan_buku.py
# Latihan Mandiri (Bab 2): Class Buku dengan Diskon & Dunder Length
# ==============================================================================

class Buku:
    def __init__(self, judul: str, penulis: str, harga_asli: float, jumlah_halaman: int):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen: float) -> float:
        """Mengembalikan harga setelah dipotong diskon (persen)."""
        if not 0 <= persen <= 100:
            raise ValueError("Persen diskon harus 0-100")
        return self.harga_asli * (1 - persen / 100)

    def __str__(self) -> str:
        return (f"+{'-' * 40}+\n"
                f"| Judul   : {self.judul}\n"
                f"| Penulis : {self.penulis}\n"
                f"| Harga   : Rp {self.harga_asli:,.0f}\n"
                f"| Halaman : {self.jumlah_halaman}\n"
                f"+{'-' * 40}+")

    def __len__(self) -> int:
        """len(buku) mengembalikan jumlah halaman."""
        return self.jumlah_halaman


if __name__ == "__main__":
    b = Buku("Pemrograman Python", "Budi Santoso", 120000, 320)
    print(b)
    print("Harga diskon 25%:", b.hitung_harga_diskon(25))
    print("len(buku)       :", len(b))

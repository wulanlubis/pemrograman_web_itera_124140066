# ==============================================================================
# Berkas: latihan_karyawan.py
# Latihan Mandiri (Bab 4): Enkapsulasi Penggajian Karyawan
# ==============================================================================

class Karyawan:
    UMR = 3_200_000  # Upah Minimum Regional

    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        self.nama = nama
        self.jabatan = jabatan
        self.__gaji_pokok = self.UMR
        self.gaji_pokok = gaji_pokok  # lewat setter agar divalidasi

    @property
    def gaji_pokok(self) -> float:
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, nilai: float):
        if not isinstance(nilai, (int, float)):
            raise TypeError("Gaji harus berupa angka!")
        if nilai < self.UMR:
            raise ValueError(f"Gaji pokok tidak boleh di bawah UMR (Rp {self.UMR:,})")
        self.__gaji_pokok = float(nilai)

    def hitung_gaji_bersih(self, pajak_persen: float) -> float:
        """Gaji pokok dikurangi pajak (dalam persen)."""
        return self.__gaji_pokok * (1 - pajak_persen / 100)


if __name__ == "__main__":
    k = Karyawan("Siti", "Programmer", 5_000_000)
    print(f"{k.nama} ({k.jabatan}) - Gaji pokok: Rp {k.gaji_pokok:,.0f}")
    print(f"Gaji bersih (pajak 5%): Rp {k.hitung_gaji_bersih(5):,.0f}")
    try:
        k.gaji_pokok = 2_000_000
    except ValueError as e:
        print("Validasi:", e)
    k.gaji_pokok = 6_000_000
    print(f"Gaji setelah naik: Rp {k.gaji_pokok:,.0f}")

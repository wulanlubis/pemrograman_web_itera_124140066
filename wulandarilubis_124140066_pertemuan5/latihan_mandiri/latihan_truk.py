# ==============================================================================
# Berkas: latihan_truk.py
# Latihan Mandiri (Bab 3): Armada Truk Ekspedisi Kargo
# ==============================================================================
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from importlib import import_module

Kendaraan = import_module("03_inheritance").Kendaraan


class Truk(Kendaraan):
    def __init__(self, merek, model, tahun, kapasitas_maksimal_ton: float):
        super().__init__(merek, model, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0.0

    def muat_barang(self, berat_ton: float) -> bool:
        """Menambah muatan jika tidak melampaui kapasitas maksimal."""
        if berat_ton <= 0:
            print("Berat muatan harus lebih dari 0!")
            return False
        if self.muatan_saat_ini + berat_ton > self.kapasitas_maksimal_ton:
            print(f"Gagal: melebihi kapasitas ({self.muatan_saat_ini + berat_ton} > "
                  f"{self.kapasitas_maksimal_ton} ton)")
            return False
        self.muatan_saat_ini += berat_ton
        print(f"Muatan +{berat_ton} ton. Total: {self.muatan_saat_ini} ton")
        return True

    def deskripsi(self) -> str:
        return (f"{super().deskripsi()} [Truk, Muatan: {self.muatan_saat_ini}/"
                f"{self.kapasitas_maksimal_ton} ton]")

    def klakson(self) -> str:
        return "Toooot! (Klakson Truk)"


if __name__ == "__main__":
    t = Truk("Hino", "Dutro", 2021, 8.0)
    print(t.deskripsi())
    t.muat_barang(5)
    t.muat_barang(4)   # melebihi kapasitas
    t.muat_barang(3)
    print(t.deskripsi())

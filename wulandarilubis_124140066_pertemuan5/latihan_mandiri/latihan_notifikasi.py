# ==============================================================================
# Berkas: latihan_notifikasi.py
# Latihan Mandiri (Bab 5): Engine Dispatcher Multi-Saluran Notifikasi
# (Polymorphism via Duck Typing: tidak ada parent class)
# ==============================================================================

class NotifikasiEmail:
    def kirim(self, pesan: str, penerima: str):
        print(f"[EMAIL] Ke: {penerima} | Isi: {pesan}")


class NotifikasiSMS:
    def kirim(self, pesan: str, penerima: str):
        print(f"[SMS] Ke: {penerima} | Isi: {pesan[:160]}")


class NotifikasiWhatsApp:
    def kirim(self, pesan: str, penerima: str):
        print(f"[WhatsApp] Ke: {penerima} | Isi: {pesan}")


def broadcast_pengumuman(daftar_channel: list, pesan: str, penerima: str = "semua pengguna"):
    """Mengirim pesan siaran ke seluruh kanal sekaligus."""
    print(f"\n=== BROADCAST: {pesan} ===")
    for channel in daftar_channel:
        channel.kirim(pesan, penerima)


if __name__ == "__main__":
    channels = [NotifikasiEmail(), NotifikasiSMS(), NotifikasiWhatsApp()]
    broadcast_pengumuman(channels, "Server maintenance malam ini pukul 23.00 WIB")

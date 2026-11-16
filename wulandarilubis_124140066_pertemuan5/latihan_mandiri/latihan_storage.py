# ==============================================================================
# Berkas: latihan_storage.py
# Latihan Mandiri (Bab 6): Interface File Storage Service
# ==============================================================================
from abc import ABC, abstractmethod
import os


class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file: str, data_bytes: bytes) -> bool:
        """Menyimpan file."""

    @abstractmethod
    def download_file(self, nama_file: str) -> bytes:
        """Mengambil isi file."""


class LocalDiskStorage(FileStorage):
    """Simulasi penyimpanan di folder lokal."""
    def __init__(self, folder: str = "storage_lokal"):
        self.folder = folder
        os.makedirs(folder, exist_ok=True)

    def upload_file(self, nama_file, data_bytes):
        with open(os.path.join(self.folder, nama_file), "wb") as f:
            f.write(data_bytes)
        print(f"[LocalDisk] '{nama_file}' disimpan di folder '{self.folder}' ({len(data_bytes)} bytes)")
        return True

    def download_file(self, nama_file):
        path = os.path.join(self.folder, nama_file)
        if not os.path.exists(path):
            raise FileNotFoundError(nama_file)
        with open(path, "rb") as f:
            print(f"[LocalDisk] '{nama_file}' dibaca dari disk")
            return f.read()


class CloudStorage(FileStorage):
    """Simulasi penyimpanan cloud (disimpan dalam dictionary)."""
    def __init__(self, bucket: str = "paw-bucket"):
        self.bucket = bucket
        self.__objek = {}

    def upload_file(self, nama_file, data_bytes):
        self.__objek[nama_file] = data_bytes
        print(f"[Cloud] '{nama_file}' diunggah ke bucket '{self.bucket}' ({len(data_bytes)} bytes)")
        return True

    def download_file(self, nama_file):
        if nama_file not in self.__objek:
            raise FileNotFoundError(nama_file)
        print(f"[Cloud] '{nama_file}' diunduh dari bucket '{self.bucket}'")
        return self.__objek[nama_file]


if __name__ == "__main__":
    import tempfile
    os.chdir(tempfile.mkdtemp())  # agar tidak mengotori folder kerja saat dites
    for storage in [LocalDiskStorage(), CloudStorage()]:
        storage.upload_file("catatan.txt", b"Halo ITERA")
        print("Isi:", storage.download_file("catatan.txt"))
    try:
        FileStorage()
    except TypeError as e:
        print("Abstract class tidak bisa diinstansiasi:", e)

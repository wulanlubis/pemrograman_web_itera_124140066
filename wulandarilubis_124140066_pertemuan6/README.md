# Pyramid RESTful API: Mahasiswa & Matakuliah

- **Nama:** Wulandari Lubis
- **NIM:** 124140066
- **Kelas Praktikum:** RA

## Deskripsi

RESTful API berbasis Pyramid, PostgreSQL, SQLAlchemy ORM, dan Alembic untuk
mengelola data Mahasiswa dan Matakuliah (operasi CRUD, respons JSON).

## Instalasi & Menjalankan (Windows PowerShell)

1. Buat dan aktifkan virtual environment:
   ```
   python -m venv venv
   venv\Scripts\Activate.ps1
   ```
2. Pasang dependensi:
   ```
   pip install --upgrade pip setuptools
   pip install -e ".[testing]"
   ```
3. Buat database dan user PostgreSQL:
   ```sql
   CREATE DATABASE pyramid_mahasiswa;
   CREATE USER pyramid_user WITH ENCRYPTED PASSWORD 'pyramid_pass';
   GRANT ALL PRIVILEGES ON DATABASE pyramid_mahasiswa TO pyramid_user;
   \c pyramid_mahasiswa
   GRANT ALL ON SCHEMA public TO pyramid_user;
   ```
4. Sesuaikan `sqlalchemy.url` di `development.ini`:
   `postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa`
5. Jalankan migrasi dan seeding:
   ```
   alembic -c development.ini upgrade head
   python -m pyramid_mahasiswa.scripts.initialize_db development.ini
   ```
6. Jalankan server (http://localhost:6543):
   ```
   pserve development.ini --reload
   ```

## Endpoint

| Method | URL                  | Keterangan                                             |
| ------ | -------------------- | ------------------------------------------------------ |
| GET    | /api/mahasiswa       | Daftar semua mahasiswa                                 |
| GET    | /api/mahasiswa/{id}  | Detail mahasiswa (404 jika tidak ada)                  |
| POST   | /api/mahasiswa       | Tambah mahasiswa                                       |
| PUT    | /api/mahasiswa/{id}  | Ubah mahasiswa                                         |
| DELETE | /api/mahasiswa/{id}  | Hapus mahasiswa                                        |
| GET    | /api/matakuliah      | Daftar semua matakuliah                                |
| GET    | /api/matakuliah/{id} | Detail matakuliah (404 jika tidak ada)                 |
| POST   | /api/matakuliah      | Tambah matakuliah (400 jika tidak lengkap/tidak valid) |
| PUT    | /api/matakuliah/{id} | Ubah matakuliah                                        |
| DELETE | /api/matakuliah/{id} | Hapus matakuliah                                       |

## Bukti Pengujian

### Matakuliah

![GET all](screenshots/mk_get_all.png)
![GET one](screenshots/mk_get_one.png)
![GET 404](screenshots/mk_get_404.png)
![POST 400](screenshots/mk_post_400.png)
![PUT](screenshots/mk_put.png)
![DELETE](screenshots/mk_delete.png)

### Mahasiswa

![GET all](screenshots/mhs_get_all.png)
![GET one](screenshots/mhs_get_one.png)
![POST](screenshots/mhs_post.png)

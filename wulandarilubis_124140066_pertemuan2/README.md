
# StudySpace — Student Productivity Dashboard

## Deskripsi
StudySpace adalah aplikasi dashboard produktivitas mahasiswa berbasis HTML,
CSS, dan JavaScript. Aplikasi ini membantu pengguna mengelola tugas kuliah,
memantau deadline, serta melihat informasi cuaca sekitar ITERA.

## Fitur
- Menambahkan tugas kuliah.
- Mengedit informasi tugas.
- Menghapus tugas dengan konfirmasi.
- Menandai tugas selesai atau belum selesai.
- Mencari tugas berdasarkan nama atau mata kuliah.
- Memfilter tugas berdasarkan status.
- Menampilkan jumlah total, tugas selesai, dan tugas yang belum selesai.
- Menyimpan data tugas menggunakan localStorage.
- Menampilkan informasi cuaca melalui Open-Meteo API.
- Desain responsif untuk desktop dan perangkat seluler.

## Teknologi
- HTML5
- CSS3
- JavaScript ES6+
- Browser localStorage
- Fetch API dan Open-Meteo API

## Struktur File
- `index.html`: struktur halaman aplikasi.
- `style.css`: desain dan layout.
- `script.js`: logika aplikasi, CRUD, penyimpanan, dan API cuaca.

## Cara Menjalankan
1. Unduh atau clone repository.
2. Buka folder project di Visual Studio Code.
3. Jalankan `index.html` dengan ekstensi Live Server.
4. Pastikan koneksi internet tersedia untuk mengambil data cuaca.

Aplikasi tidak memerlukan API key untuk mengakses Open-Meteo.

## Implementasi ES6+
Nomor baris berikut perlu diperiksa kembali setelah kode final disimpan.

| Fitur ES6+ | Implementasi |
|---|---|
| `const` dan `let` | Deklarasi variabel dan konstanta di `script.js`. |
| Class | `TaskItem` dan `DashboardApp`. |
| Arrow function | `getElement`, `isTaskCompleted`, `sortTasksByDeadline`, serta callback event. |
| Template literal | `taskTemplate()` untuk membuat kartu tugas. |
| Destructuring | Pengambilan properti tugas pada `taskTemplate()`. |
| Spread operator | Penambahan tugas dengan `[...this.tasks, newTask]`. |
| Async/await | `loadWeather()` untuk mengambil data API. |
| Array methods | `map()`, `filter()`, `find()`, dan `sort()`. |
| Optional chaining | `globalThis.crypto?.randomUUID?.()`. |
| Nullish coalescing | `??` pada pembuatan ID tugas. |

## Penyimpanan Data
Data tugas disimpan pada localStorage browser dengan key
`studyspace_tasks_v1`. Data bertahan ketika halaman dimuat ulang pada
browser yang sama, tetapi tidak otomatis tersinkronisasi antarperangkat.

## API
Open-Meteo Forecast API:
https://open-meteo.com/

API digunakan untuk mendapatkan suhu, kelembapan, kode cuaca, dan kecepatan
angin. Data cuaca membutuhkan koneksi internet.

## Screenshot
Screenshot aplikasi setelah dijalankan:
- `screenshots/dashboard.png`
- `screenshots/taskmanagement.png`

## Pengujian
- [ ] Menambah tugas baru.
- [ ] Mengedit tugas.
- [ ] Menghapus tugas.
- [ ] Mengubah status selesai.
- [ ] Mencari dan memfilter tugas.
- [ ] Memuat ulang halaman dan memeriksa persistensi data.
- [ ] Menguji data cuaca ketika internet tersedia.

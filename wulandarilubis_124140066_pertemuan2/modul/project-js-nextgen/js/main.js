// // js/main.js
// // File pengendali antarmuka web (DOM Controller)

// // Fungsi helper untuk merender kartu hasil demo ke dalam antarmuka
// export function addOutput(title, subtitle, content) {
//   const outputEl = document.getElementById("output");
//   if (!outputEl) return;
//   const card = document.createElement("div");
//   card.className = "output-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm";
//   card.innerHTML = `
//     <h4 class="font-bold text-blue-600 text-base mb-1">${title}</h4>
//     <p class="text-xs text-gray-500 mb-2">${subtitle}</p>
//     <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap overflow-x-auto result">${content}</pre>
//   `;
//   outputEl.appendChild(card);
// }

// // Event handler untuk tombol pembersih layar
// document.getElementById("clearBtn")?.addEventListener("click", () => {
//   const outputEl = document.getElementById("output");
//   if (outputEl) outputEl.innerHTML = "";
// });

// js/main.js
import { LaporanPraktikum, simulasiFetchData } from './app.js';
import { konfigurasiApp } from './modules/data.js';

// Fungsi helper untuk merender kartu hasil demo ke dalam antarmuka
export function addOutput(title, subtitle, content) {
  const outputEl = document.getElementById("output");
  if (!outputEl) return;
  const card = document.createElement("div");
  card.className = "output-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm";
  card.innerHTML = `
    <h4 class="font-bold text-blue-600 text-base mb-1">${title}</h4>
    <p class="text-xs text-gray-500 mb-2">${subtitle}</p>
    <pre class="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono whitespace-pre-wrap overflow-x-auto result">${content}</pre>
  `;
  outputEl.appendChild(card);
}

// Event handler untuk tombol Run Demo
document.getElementById("runBtn")?.addEventListener("click", async () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";

  // 1. Tampilkan Info Aplikasi
  addOutput("1. Fitur ES6 (Const & Destructuring)", "Konfigurasi Modul", JSON.stringify(konfigurasiApp, null, 2));

  // 2. Tampilkan Hasil Class & Method
  const laporan = new LaporanPraktikum("Modul ES6+ ITERA");
  addOutput("2. Implementasi Class & Array Method", "Hasil Olah Data Mahasiswa", JSON.stringify(laporan.dapatkanRingkasan(), null, 2));

  // 3. Tampilkan Hasil Fungsi Asinkron (Async/Await)
  const hasilAsync = await simulasiFetchData();
  addOutput("3. Async/Await & Promise", "Simulasi Fetch API", JSON.stringify(hasilAsync, null, 2));
});

// Event handler untuk tombol Clear Output
document.getElementById("clearBtn")?.addEventListener("click", () => {
  const outputEl = document.getElementById("output");
  if (outputEl) outputEl.innerHTML = "";
});
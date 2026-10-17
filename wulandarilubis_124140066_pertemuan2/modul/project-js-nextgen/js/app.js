// // JavaScript Next Gen Demo Code

// // ----------------------------
// // Let dan Const
// // ----------------------------
// export function demoVariables() {
//   // Menggunakan var (cara lama)
//   var oldVar = "Old variable";
//   {
//     var oldVar = "Changed inside block";
//   }

//   // Menggunakan let (ES6)
//   let newLet = "New let variable";
//   {
//     let newLet = "Different variable inside block";
//     console.log("newLet inside block:", newLet);
//   }

//   // Menggunakan const (ES6)
//   const PI = 3.14159;
//   const user = { name: "John", age: 30 };
//   // PI = 3.15; // Error! Tidak bisa mengubah nilai const
//   user.age = 31; // Ini valid! Konten objek const dapat diubah

//   return {
//     oldVar,
//     newLet,
//     PI,
//     user
//   };
// }

// // ----------------------------
// // Arrow Functions
// // ----------------------------
// export function demoArrowFunctions() {
//   // Fungsi reguler
//   function regularSum(a, b) {
//     return a + b;
//   }

//   // Arrow function dasar
//   const arrowSum = (a, b) => {
//     return a + b;
//   };

//   // Arrow function dengan implicit return
//   const shortArrowSum = (a, b) => a + b;

//   // Arrow function tanpa parameter
//   const sayHello = () => "Hello World!";

//   // Arrow function dengan satu parameter (kurung opsional)
//   const square = x => x * x;

//   return {
//     regularSum: regularSum(5, 3),
//     arrowSum: arrowSum(5, 3),
//     shortArrowSum: shortArrowSum(5, 3),
//     sayHello: sayHello(),
//     square: square(4)
//   };
// }

import { sampelMahasiswa } from './modules/data.js';
import { formatMahasiswa, saringNilaiTinggi } from './modules/utils.js';

// Implementasi Class ES6
export class LaporanPraktikum {
  constructor(judul) {
    this.judul = judul;
  }

  dapatkanRingkasan() {
    const mhsLulus = saringNilaiTinggi(sampelMahasiswa, 80);
    // Spread Operator
    const gabunganData = [...sampelMahasiswa]; 

    return {
      totalMahasiswa: gabunganData.length,
      mahasiswaLulus: mhsLulus.map(formatMahasiswa)
    };
  }
}

// Fungsi Asinkron (Async/Await)
export const simulasiFetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 200, pesan: "Data modul berhasil dimuat secara asynchronous!" });
    }, 500);
  });
};
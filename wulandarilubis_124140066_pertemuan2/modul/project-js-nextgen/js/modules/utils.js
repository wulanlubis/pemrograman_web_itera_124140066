// // js/modules/utils.js
// // Kumpulan fungsi utilitas pembantu yang diekspor
// export const formatRupiah = (number) => {
//   return new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     maximumFractionDigits: 0
//   }).format(number);
// };

// export const capitalize = (text) => {
//   if (!text) return "";
//   return text.charAt(0).toUpperCase() + text.slice(1);
// };

// Arrow Function & Template Literals
export const formatMahasiswa = (mhs) => {
  const { nama, matkul, nilai } = mhs; // Destructuring
  return `Mahasiswa: ${nama} | Matkul: ${matkul} | Nilai: ${nilai}`;
};

// Arrow Function untuk menyaring data
export const saringNilaiTinggi = (daftarMhs, batas = 80) => {
  return daftarMhs.filter(mhs => mhs.nilai >= batas);
};
# Pengolahan data nilai mahasiswa

# list
mahasiswa = [
    {
        "nama": "Wulan",
        "nim": "124140066",
        "nilai_uts": 80,
        "nilai_uas": 85,
        "nilai_tugas": 90
    },

    {
        "nama": "Sere",
        "nim": "124140150",
        "nilai_uts": 85,
        "nilai_uas": 90,
        "nilai_tugas": 88
    },
    {
        "nama": "Sena",
        "nim": "124140018",
        "nilai_uts": 75,
        "nilai_uas": 80,
        "nilai_tugas": 85
    },
    {
        "nama": "Naura",
        "nim": "124140072",
        "nilai_uts": 60,
        "nilai_uas": 70,
        "nilai_tugas": 75
    },
    {
        "nama": "Naddya",
        "nim": "124140225",
        "nilai_uts": 50,
        "nilai_uas": 55,
        "nilai_tugas": 60
    },
    {
        "nama": "Irul",
        "nim": "124140000",
        "nilai_uts": 90,
        "nilai_uas": 95,
        "nilai_tugas": 92
    }
]

# Menghitung nilai akhir dan menentukan grade
for mhs in mahasiswa:

    nilai_akhir = (
        0.30 * mhs["nilai_uts"]
        + 0.40 * mhs["nilai_uas"]
        + 0.30 * mhs["nilai_tugas"]
    )

    mhs["nilai_akhir"] = nilai_akhir

    if nilai_akhir >= 80:
        mhs["grade"] = "A"
    elif nilai_akhir >= 70:
        mhs["grade"] = "B"
    elif nilai_akhir >= 60:
        mhs["grade"] = "C"
    elif nilai_akhir >= 50:
        mhs["grade"] = "D"
    else:
        mhs["grade"] = "E"


# Menampilkan tabel data mahasiswa
print("=" * 50)
print("         DAFTAR NILAI AKHIR MAHASISWA")
print("=" * 50)
print("\n")

print(
    f"{'Nama':<12}"
    f"{'NIM':<15}"
    f"{'Nilai UTS':<12}"
    f"{'Nilai UAS':<12}"
    f"{'Nilai Tugas':<13}"
    f"{'Nilai Akhir':<13}"
    f"{'Grade':<6}"
)

print("-" * 85)

for mhs in mahasiswa:
    print(
        f"{mhs['nama']:<12}"
        f"{mhs['nim']:<15}"
        f"{mhs['nilai_uts']:<12}"
        f"{mhs['nilai_uas']:<12}"
        f"{mhs['nilai_tugas']:<13}"
        f"{mhs['nilai_akhir']:<13.2f}"
        f"{mhs['grade']:<6}"
    )

print("=" * 85)


# Mencari mahasiswa dengan nilai tertinggi dan terendah
nilai_tertinggi = max(
    mahasiswa, key=lambda mhs: mhs["nilai_akhir"]
)

nilai_terendah = min(
    mahasiswa, key=lambda mhs: mhs["nilai_akhir"]
)

# Menampilkan hasil
print("\n===== HASIL NILAI TERTINGGI DAN TERENDAH =====")

print(
    f"Nilai Tertinggi : {nilai_tertinggi['nama']} "
    f"({nilai_tertinggi['nim']}) - "
    f"{nilai_tertinggi['nilai_akhir']:.2f}"
)

print(
    f"Nilai Terendah  : {nilai_terendah['nama']} "
    f"({nilai_terendah['nim']}) - "
    f"{nilai_terendah['nilai_akhir']:.2f}"
)

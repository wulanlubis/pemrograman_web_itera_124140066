
# Program Utama Operasi Matematika

# Cara impor pertama
import math_operations

# Cara impor kedua
from math_operations import (
    luas_persegi,
    keliling_persegi,
    luas_persegi_panjang,
    keliling_persegi_panjang,
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin
)


# Menggunakan konstanta PI dari modul
print("=" * 50)
print("       PROGRAM OPERASI MATEMATIKA")
print("=" * 50)

print(f"Nilai PI: {math_operations.PI}")


# 1. Operasi persegi
sisi = 5

print("\n--- PERSEGI ---")
print(f"Sisi              : {sisi}")
print(f"Luas              : {luas_persegi(sisi):.2f}")
print(f"Keliling          : {keliling_persegi(sisi)}")


# 2. Operasi persegi panjang
panjang = 10
lebar = 5

print("\n--- PERSEGI PANJANG ---")
print(f"Panjang           : {panjang}")
print(f"Lebar             : {lebar}")
print(
    f"Luas              : "
    f"{luas_persegi_panjang(panjang, lebar):.2f}"
)
print(
    f"Keliling          : "
    f"{keliling_persegi_panjang(panjang, lebar)}"
)


# 3. Operasi lingkaran
jari_jari = 7

print("\n--- LINGKARAN ---")
print(f"Jari-jari         : {jari_jari}")
print(f"Luas              : {luas_lingkaran(jari_jari):.2f}")
print(
    f"Keliling          : "
    f"{keliling_lingkaran(jari_jari):.2f}"
)


# 4. Konversi temperatur
suhu = 25

print("\n--- KONVERSI TEMPERATUR ---")
print(f"Suhu Celsius      : {suhu} °C")
print(
    f"Fahrenheit        : "
    f"{celsius_ke_fahrenheit(suhu):.2f} °F"
)
print(
    f"Kelvin            : "
    f"{celsius_ke_kelvin(suhu):.2f} K"
)


print("\n" + "=" * 50)
print("             PROGRAM SELESAI")
print("=" * 50)

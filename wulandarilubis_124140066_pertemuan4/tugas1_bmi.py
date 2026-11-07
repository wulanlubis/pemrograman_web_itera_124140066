# Kalkulator BMI

# input berat dan tinggi badan
berat = float(input("Masukkan berat badan Anda (kg): "))
tinggi = float(input("Masukkan tinggi badan Anda (m): "))

# menghitung BMI
bmi = berat / (tinggi * tinggi)

# menentukan kategori  BMI
if bmi < 18.5:
    kategori = "Berat badan kurang"
elif bmi < 25:
    kategori = "Berat badan normal"
elif bmi < 30:
    kategori = "Berat badan berlebih"
else:
    kategori = "Obesitas"

# Menampilka Hasil
print("\n HASIL PERHTUNGAN BMI ANDA")
print(f"Berat badan : {berat} kg")
print(f"Tinggi badan : {tinggi} m")
print(f"Nilai BMI: {bmi:.2f}")
print(f"Kategori: {kategori}")
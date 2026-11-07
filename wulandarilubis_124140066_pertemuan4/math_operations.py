
# Modul Operasi Matematika

# Konstanta nilai PI
PI = 3.14159


# Fungsi luas persegi
def luas_persegi(sisi):
    """
    Parameter:
        sisi: panjang sisi persegi.

    Return:
        Luas persegi.
    """
    return sisi * sisi


# Fungsi keliling persegi
def keliling_persegi(sisi):
    """
    Parameter:
        sisi: panjang sisi persegi.

    Return:
        Keliling persegi.
    """
    return 4 * sisi


# Fungsi luas persegi panjang
def luas_persegi_panjang(panjang, lebar):
    """
    Parameter:
        panjang: panjang persegi panjang.
        lebar: lebar persegi panjang.

    Return:
        Luas persegi panjang.
    """
    return panjang * lebar


# Fungsi keliling persegi panjang
def keliling_persegi_panjang(panjang, lebar):
    """
    Parameter:
        panjang: panjang persegi panjang.
        lebar: lebar persegi panjang.

    Return:
        Keliling persegi panjang.
    """
    return 2 * (panjang + lebar)


# Fungsi luas lingkaran
def luas_lingkaran(jari_jari):
    """
    Parameter:
        jari_jari: panjang jari-jari lingkaran.

    Return:
        Luas lingkaran.
    """
    return PI * jari_jari ** 2


# Fungsi keliling lingkaran
def keliling_lingkaran(jari_jari):
    """
    Parameter:
        jari_jari: panjang jari-jari lingkaran.

    Return:
        Keliling lingkaran.
    """
    return 2 * PI * jari_jari


# Fungsi konversi Celsius ke Fahrenheit
def celsius_ke_fahrenheit(celsius):
    """
    Parameter:
        celsius: suhu dalam derajat Celsius.

    Return:
        Suhu dalam derajat Fahrenheit.
    """
    return (celsius * 9 / 5) + 32


# Fungsi konversi Celsius ke Kelvin
def celsius_ke_kelvin(celsius):
    """
    Parameter:
        celsius: suhu dalam derajat Celsius.

    Return:
        Suhu dalam Kelvin.
    """
    return celsius + 273.15

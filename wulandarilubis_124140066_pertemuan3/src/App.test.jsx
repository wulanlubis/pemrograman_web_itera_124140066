import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('Aplikasi Manajemen Buku Pribadi', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('1. Menampilkan judul utama aplikasi', () => {
    render(<App />);
    expect(screen.getByText(/Manajemen Buku Pribadi/i)).toBeInTheDocument();
  });

  it('2. Menampilkan pesan error validasi saat form dikirim kosong', () => {
    render(<App />);
    const submitBtn = screen.getByRole('button', { name: /tambah buku/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Judul buku wajib diisi!')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi!')).toBeInTheDocument();
  });

  it('3. Berhasil menambahkan buku baru ke dalam daftar', () => {
    render(<App />);
    const inputJudul = screen.getByPlaceholderText('Masukkan judul buku...');
    const inputPenulis = screen.getByPlaceholderText('Masukkan nama penulis...');
    const submitBtn = screen.getByRole('button', { name: /tambah buku/i });

    fireEvent.change(inputJudul, { target: { value: 'Laskar Pelangi' } });
    fireEvent.change(inputPenulis, { target: { value: 'Andrea Hirata' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('Andrea Hirata')).toBeInTheDocument();
  });

  it('4. Mengubah pencarian buku berdasarkan input kata kunci', () => {
    render(<App />);
    const inputSearch = screen.getByPlaceholderText('🔍 Cari berdasarkan judul atau penulis...');
    
    fireEvent.change(inputSearch, { target: { value: 'Buku Tidak Ada' } });
    expect(screen.getByText('📚 Tidak ada buku yang ditemukan.')).toBeInTheDocument();
  });

  it('5. Berhasil melakukan navigasi ke halaman Statistik', () => {
    render(<App />);
    const linkStats = screen.getByRole('link', { name: /statistik/i });

    fireEvent.click(linkStats);
    expect(screen.getByText(/Statistik Koleksi Buku/i)).toBeInTheDocument();
  });
});
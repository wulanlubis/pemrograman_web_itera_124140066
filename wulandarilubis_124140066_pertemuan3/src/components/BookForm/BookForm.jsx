import { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';
import './BookForm.css';

export function BookForm() {
  const { addBook, updateBook, editingBook, setEditingBook } = useBooks();

  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [status, setStatus] = useState('milik');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setJudul(editingBook.judul);
      setPenulis(editingBook.penulis);
      setStatus(editingBook.status);
    }
  }, [editingBook]);

  const validate = () => {
    const errs = {};
    if (!judul.trim()) errs.judul = 'Judul buku wajib diisi!';
    if (!penulis.trim()) errs.penulis = 'Nama penulis wajib diisi!';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    if (editingBook) {
      updateBook(editingBook.id, { judul, penulis, status });
    } else {
      addBook({ judul, penulis, status });
    }

    setJudul('');
    setPenulis('');
    setStatus('milik');
  };

  const handleCancel = () => {
    setEditingBook(null);
    setJudul('');
    setPenulis('');
    setStatus('milik');
    setErrors({});
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h3>{editingBook ? '✏️ Edit Buku' : '➕ Tambah Buku Baru'}</h3>

      <div className="form-group">
        <label htmlFor="judul">Judul Buku</label>
        <input
          id="judul"
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className={errors.judul ? 'input-error' : ''}
          placeholder="Masukkan judul buku..."
        />
        {errors.judul && <span className="error-text">{errors.judul}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="penulis">Penulis</label>
        <input
          id="penulis"
          type="text"
          value={penulis}
          onChange={(e) => setPenulis(e.target.value)}
          className={errors.penulis ? 'input-error' : ''}
          placeholder="Masukkan nama penulis..."
        />
        {errors.penulis && <span className="error-text">{errors.penulis}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status Buku</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {editingBook && (
          <button type="button" className="btn-secondary" onClick={handleCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
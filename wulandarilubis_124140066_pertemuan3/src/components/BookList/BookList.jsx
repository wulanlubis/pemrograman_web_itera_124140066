import PropTypes from 'prop-types';
import { useBooks } from '../../context/BookContext';
import './BookList.css';

export function BookList() {
  const { filteredBooks, deleteBook, setEditingBook } = useBooks();

  if (filteredBooks.length === 0) {
    return <p className="empty-message">📚 Tidak ada buku yang ditemukan.</p>;
  }

  return (
    <div className="book-list">
      {filteredBooks.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={() => setEditingBook(book)}
          onDelete={() => deleteBook(book.id)}
        />
      ))}
    </div>
  );
}

function BookItem({ book, onEdit, onDelete }) {
  const statusLabel = {
    milik: 'Dimiliki',
    baca: 'Sedang Dibaca',
    beli: 'Ingin Dibeli',
  };

  return (
    <div className="book-card">
      <div className="book-info">
        <h4>{book.judul}</h4>
        <p>Penulis: <span>{book.penulis}</span></p>
        <span className={`badge badge-${book.status}`}>
          {statusLabel[book.status]}
        </span>
      </div>
      <div className="card-actions">
        <button className="btn-edit" onClick={onEdit}>
          Edit
        </button>
        <button className="btn-delete" onClick={onDelete}>
          Hapus
        </button>
      </div>
    </div>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    judul: PropTypes.string.isRequired,
    penulis: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
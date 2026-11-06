import { useBooks } from '../../context/BookContext';
import './BookFilter.css';

export function BookFilter() {
  const { filterStatus, setFilterStatus, searchQuery, setSearchQuery } = useBooks();

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="🔍 Cari berdasarkan judul atau penulis..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="filter-buttons">
        <button
          className={filterStatus === 'semua' ? 'active' : ''}
          onClick={() => setFilterStatus('semua')}
        >
          Semua
        </button>
        <button
          className={filterStatus === 'milik' ? 'active' : ''}
          onClick={() => setFilterStatus('milik')}
        >
          Dimiliki
        </button>
        <button
          className={filterStatus === 'baca' ? 'active' : ''}
          onClick={() => setFilterStatus('baca')}
        >
          Sedang Dibaca
        </button>
        <button
          className={filterStatus === 'beli' ? 'active' : ''}
          onClick={() => setFilterStatus('beli')}
        >
          Ingin Dibeli
        </button>
      </div>
    </div>
  );
}
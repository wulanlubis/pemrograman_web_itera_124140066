import { useBooks } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

export function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div className="stats-container">
      <h2>📊 Statistik Koleksi Buku</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Buku</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Dimiliki</h3>
          <p className="stat-number">{stats.milik}</p>
        </div>
        <div className="stat-card">
          <h3>Sedang Dibaca</h3>
          <p className="stat-number">{stats.baca}</p>
        </div>
        <div className="stat-card">
          <h3>Ingin Dibeli</h3>
          <p className="stat-number">{stats.beli}</p>
        </div>
      </div>
    </div>
  );
}
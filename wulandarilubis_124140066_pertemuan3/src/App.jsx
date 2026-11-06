import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import { Home } from './pages/home/Home';
import { Stats } from './pages/stats/Stats';
import './App.css';

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <div className="app-layout">
          <header className="navbar">
            <h1>📖 Manajemen Buku Pribadi</h1>
            <nav>
              <Link to="/">Beranda</Link>
              <Link to="/stats">Statistik</Link>
            </nav>
          </header>
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </BookProvider>
  );
}
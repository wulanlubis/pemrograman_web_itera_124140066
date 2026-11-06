import { BookForm } from '../../components/BookForm/BookForm';
import { BookFilter } from '../../components/BookFilter/BookFilter';
import { BookList } from '../../components/BookList/BookList';
import './Home.css';

export function Home() {
  return (
    <div className="home-container">
      <aside className="sidebar">
        <BookForm />
      </aside>
      <section className="main-content">
        <BookFilter />
        <BookList />
      </section>
    </div>
  );
}
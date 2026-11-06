import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('my_books_data', []);
  const [filterStatus, setFilterStatus] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
    };
    setBooks((prev) => [newBook, ...prev]);
  };

  const updateBook = (id, updatedData) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedData } : b))
    );
    setEditingBook(null);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  const filteredBooks = books.filter((book) => {
    const matchStatus = filterStatus === 'semua' || book.status === filterStatus;
    const matchQuery =
      book.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.penulis.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
        editingBook,
        setEditingBook,
        addBook,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}
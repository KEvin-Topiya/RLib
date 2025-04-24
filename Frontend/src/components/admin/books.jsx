import React, { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../../config";

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showGroupedByIsbn, setShowGroupedByIsbn] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${CONFIG.DOMAIN}${CONFIG.API.BOOKS}`);
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedBooks = books.reduce((acc, book) => {
    if (!acc[book.isbn]) {
      acc[book.isbn] = { ...book, count: 1 };
    } else {
      acc[book.isbn].count += 1;
    }
    return acc;
  }, {});

  // Filter grouped ISBN list based on search
  const filteredGroupedBooks = Object.entries(groupedBooks).filter(
    ([isbn, book]) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${CONFIG.DOMAIN}${CONFIG.API.BOOKS}/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdate = (book) => {
    setEditingBook({ ...book });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.EDIT_BOOK}`, editingBook);
      setBooks(books.map((book) =>
        book.book_id === editingBook.book_id ? { ...book, ...editingBook } : book
      ));
      setShowModal(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="book-list-container">
      <h2>Book List</h2>

      <input
        type="text"
        placeholder="Search by title or ISBN..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <button
        onClick={() => setShowGroupedByIsbn(!showGroupedByIsbn)}
        className="group-by-isbn-btn"
      >
        {showGroupedByIsbn ? "Show All Books" : "Show by ISBN"}
      </button>

      <ul className="book-list">
        {showGroupedByIsbn ? (
          filteredGroupedBooks.length > 0 ? (
            filteredGroupedBooks.map(([isbn, book]) => (
              <li key={isbn} className="book-item">
                <div>
                  <strong>{book.title}</strong> (ISBN: {isbn})<br />
                </div>
                  <span style={{ fontSize: "0.9rem", color: "#555" }}>
                    Total Books: {book.count}
                  </span>
              </li>
            ))
          ) : (
            <p>No ISBN matches found.</p>
          )
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li key={book.book_id || book.id} className="book-item">
              <div>
                <span className="book-id" style={{ marginRight: "1rem" }}>{book.book_id}</span>
                <strong>{book.title}</strong> - {book.author}
              </div>
              <div className="buttons">
                <button className="update-btn" onClick={() => handleUpdate(book)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>

      {showModal && editingBook && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Book</h3>
            <label>ID:</label>
            <input type="text" value={editingBook.book_id} disabled />
            <label>Title:</label>
            <input
              type="text"
              value={editingBook.title}
              onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
            />
            <label>Author:</label>
            <input
              type="text"
              value={editingBook.author}
              onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
            />
            <label>ISBN:</label>
            <input
              type="text"
              value={editingBook.isbn}
              onChange={(e) => setEditingBook({ ...editingBook, isbn: e.target.value })}
            />
            <label>Publication Year:</label>
            <input
              type="number"
              value={editingBook.publication_year}
              onChange={(e) => setEditingBook({ ...editingBook, publication_year: e.target.value })}
            />
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;

import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "./IssuedBooksList.css"; // Import external CSS file

const IssuedBooksList = ({role}) => {
  // Dummy Data
  const [searchTerm, setSearchTerm] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([
    {
      id: 1,
      user: "John Doe",
      bookTitle: "The Great Gatsby",
      issuedDate: "2025-02-28",
      returnDate: "2025-03-14",
      renewLeft: 2,
    },
    {
      id: 2,
      user: "Jane Smith",
      bookTitle: "To Kill a Mockingbird",
      issuedDate: "2025-02-25",
      returnDate: "2025-03-10",
      renewLeft: 1,
    },
    {
      id: 3,
      user: "Alice Johnson",
      bookTitle: "1984",
      issuedDate: "2025-02-20",
      returnDate: "2025-03-05",
      renewLeft: 0,
    },
  ]);

  // Handle Search
  const filteredBooks = issuedBooks.filter((book) =>
    book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Link to={"/"+role+"/home"} className="back flx">
        <ArrowLeft /> back
      </Link>
    <div className="issued-books-container">
      <h2 className="title">Issued Books</h2>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search issued books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        />

      {/* Issued Books List */}
      {filteredBooks.length > 0 ? (
          <ul className="book-list">
          {filteredBooks.map((book) => (
              <li key={book.id} className="book-item">
              <div className="book-details">
                <strong>{book.bookTitle}</strong> <br />
                <span>User: {book.user}</span> <br />
                <span>Issued Date: {book.issuedDate}</span> <br />
                <span>Return Date: {book.returnDate}</span> <br />
                <span className={`renew ${book.renewLeft === 0 ? "red" : ""}`}>
                  Renew Left: {book.renewLeft}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
          <p className="no-books">No issued books found.</p>
        )}
    </div>
        </>
  );
};

export default IssuedBooksList;

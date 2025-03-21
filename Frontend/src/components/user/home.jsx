import CONFIG from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookIcon } from "lucide-react";

export default function Return() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [formData, setFormData] = useState({
    book_id: "",
    EnrollmentNo: sessionStorage.getItem("id"),
  });

  const fetchIssuedBooks = async () => {
    try {
      const url = `${CONFIG.DOMAIN}${CONFIG.API.ISSUED_BOOKS}`;
      const response = await axios.post(url, {
        EnrollmentNo: sessionStorage.getItem("id"),
      });

      if (response.data.status === "success") {
        setIssuedBooks(response.data.data);
      } else {
        console.error("Failed to fetch issued books");
      }
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const url = `${CONFIG.DOMAIN}${CONFIG.API.ISSUE_BOOK}`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error);
    }
  };

  const handleReissue = (book_id) => {
  // Find the book by ID
  const bookToReissue = issuedBooks.find((book) => book.book_id === book_id);

  // Check if the book has renewals left
  if (bookToReissue && bookToReissue.renew_left === 0) {
    alert("Please return the book to the library, no more reissues left.");
    return; // Stop execution if no renewals are left
  }

  // Proceed with the state update if renew_left > 0
  setIssuedBooks((prevBooks) =>
    prevBooks.map((book) =>
      book.book_id === book_id
        ? { ...book, renew_left: book.renew_left - 1 }
        : book
    )
  );
};

  return (
    <>
      <Link to="/admin/home" className="back flx">
        <ArrowLeft /> back
      </Link>
      <div className="flx login" style={{ marginTop: "1rem" }}>
        <div className="rr wf hf flx jcc">
          <form
            className="dbdr"
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "5px",
            }}
          >
            <legend style={{ fontSize: "x-large" }}>Issue Book</legend>
            <br />
            <br />
            <div className="grd">
              <span style={{ marginBottom: "1rem" }}>
                <BookIcon />
                <input
                  type="text"
                  placeholder="Book Id"
                  name="book_id"
                  value={formData.book_id}
                  onChange={(e) =>
                    setFormData({ ...formData, book_id: e.target.value })
                  }
                  required
                />
              </span>
              <button type="submit" className="btn">
                Issue
              </button>
            </div>
          </form>
        </div>
      </div>

      {issuedBooks.length > 0 ? (
        <table className="tbl dbdr">
          <thead>
            <tr>
              {Object.keys(issuedBooks[0]).map((key) => (
                <th
                  key={key}
                  className="border  border-gray-400 px-4 py-2 capitalize"
                >
                  {key.toUpperCase()} {/* Format key names */}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.book_id}>
                {Object.values(book).map((value, index) => (
                  <td
                    key={index}
                    style={{ padding: "10px", border: "1px solid #ddd" }}
                  >
                    {value}
                  </td>
                ))}
                <td>
                  <button
                    className="btn"
                    onClick={() => handleReissue(book.book_id)}
                    
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No issued books found.</p>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { BookIcon } from "lucide-react";
import CONFIG from "../../config";

export default function Return() {
  const [error, setError] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [formData, setFormData] = useState({
    book_id: "",
    EnrollmentNo: sessionStorage.getItem("id"),
  });

  // Fetch the issued books from the API
  const fetchIssuedBooks = async () => {
    try {
      const url = CONFIG.DOMAIN + CONFIG.API.ISSUED_BOOKS;
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

  // Load the issued books when the component is mounted
  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  // Handle book issuance
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const url = CONFIG.DOMAIN + CONFIG.API.ISSUE_BOOK;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert(response.data.message);
      fetchIssuedBooks(); // Refresh the list after issuing
      setFormData({ ...formData, book_id: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error issuing book");
    }
  };

  // Handle book renewal
  const handleReissue = async (book_id) => {
    try {
      const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.renew, {
        book_id: book_id,
        EnrollmentNo: sessionStorage.getItem("id"),
      });

      if (response.data.status === "success") {
        alert("Book renewed successfully!");
        fetchIssuedBooks(); // Refresh the book list
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error renewing book.");
    }
  };

  return (
    <>
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
                  className="input-field"
                />
              </span>
              <button type="submit" className="btn">Issue</button>
            </div>
          </form>
        </div>
      </div>

      {issuedBooks.length > 0 ? (
        <table className="tbl dbdr">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Issued Date</th>
              <th>Last Date</th>
              <th>Renewals Left</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.title}</td>
                <td>{book.issued_date}</td>
                <td>{book.last_date}</td>
                <td>{book.renew_left}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleReissue(book.book_id)}
                    disabled={book.renew_left <= 0}
                  >
                    {book.renew_left > 0 ? "Renew" : "No Renewals Left"}
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

import CONFIG from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, BookIcon } from "lucide-react";

export default function Return() {
  const [error, setError] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [formData, setFormData] = useState({
    book_id: "",
    EnrollmentNo: sessionStorage.getItem("id"),
  });

  // Fetch issued books from the API
  const fetchIssuedBooks = async () => {
    try {
      const url = `${CONFIG.DOMAIN}${CONFIG.API.ISSUED_BOOKS}`;
      const response = await axios.post(url, {
        EnrollmentNo: sessionStorage.getItem("id"),
      });

      if (response.data.status === "success") {
        setIssuedBooks(response.data.data);
      } else {
        alert("Failed to fetch issued books");
      }
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  // Handle the reissue of a book
  const handleReissue = async (book_id) => {
    try {
      // Find the book to reissue
      const bookToReissue = issuedBooks.find((book) => book.book_id === book_id);

      // Check if renew_left is 0
      if (bookToReissue.renew_left === 0) {
        alert("Please return the book to the library, no more reissues left.");
        return;
      }

      const url = `${CONFIG.DOMAIN}${CONFIG.API.renew}`;
      const response = await axios.post(url, { book_id });

      if (response.data.status === "success") {
        alert(response.data.message);
        fetchIssuedBooks(); // Refresh the list after successful renewal
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error renewing book:", error);
      alert("Error renewing book.");
    }
  };

  return (
    <>
      <div className="flx login" style={{ marginTop: "1rem" }}>
        <div className="rr wf hf flx jcc">
          <form
            className="dbdr"
            style={{ background: "white", padding: "1rem", borderRadius: "5px" }}
          >
            <legend style={{ fontSize: "x-large" }}>Issued Books</legend>
            <br />
            <br />
          </form>
        </div>
      </div>

      {issuedBooks.length > 0 ? (
        <table className="tbl dbdr">
          <thead>
            <tr>
              {Object.keys(issuedBooks[0]).map((key) => (
                <th key={key} className="border border-gray-400 px-4 py-2 capitalize">
                  {key.toUpperCase()}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.book_id}>
                {Object.values(book).map((value, index) => (
                  <td key={index} style={{ padding: "10px", border: "1px solid #ddd" }}>
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

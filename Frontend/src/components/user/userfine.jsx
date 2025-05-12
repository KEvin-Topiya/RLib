import { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../../config";

const FineList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fines from the API
  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.Fine, {
          id: sessionStorage.id,
        });

        if (response.data.status === "success") {
          // Sort fines: unpaid first, paid after
          const sortedFines = response.data.data.sort((a, b) => {
            if (a.status === "unpaid" && b.status === "paid") return -1;
            if (a.status === "paid" && b.status === "unpaid") return 1;
            return 0;
          });
          setFines(sortedFines);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error fetching fines.");
      } finally {
        setLoading(false);
      }
    };

    fetchFines();
  }, []);

  // Filtered Fine List
  const filteredFines = fines.filter((fine) =>
    fine.EnrollmentNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading fines...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="user-list-container">
      <h2>💰 Fine List</h2>

      {/* Search Bar */}
      

      {/* Fine List */}
      <ul className="book-list">
        {filteredFines.length > 0 ? (
          filteredFines.map((fine) => (
            <li
              key={fine.fine_id}
              className={`book-item ${fine.status === "paid" ? "paid-fine" : ""}`}
              style={{ opacity: fine.status === "paid" ? 0.5 : 1 }}
            >
              <div className="user-info">
                <strong>{fine.EnrollmentNo}</strong> -{" "}
                <span>Book ID: {fine.book_id}</span> -{" "}
                <span>Due Date: {fine.due_date}</span> -{" "}
                <span className="fine-amount">₹{fine.fine_amount}</span> -{" "}
                <span>Status: {fine.status}</span>
              </div>
              {fine.status === "unpaid" && (
                <button
                  className="btn"
                  onClick={() => alert("Go to library for payment")}
                >
                  Pay
                </button>
              )}
            </li>
          ))
        ) : (
          <p className="no-users">No fines found.</p>
        )}
      </ul>

      {/* Styling for paid fines */}
      <style>
        {`
          .paid-fine {
            opacity: 0.5;
            color: gray;
          }
          .paid-fine:hover {
            opacity: 0.6;
          }
        `}
      </style>
    </div>
  );
};

export default FineList;

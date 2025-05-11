import { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../config";

const FineList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch fines from the API
  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.allFine);

        if (response.data.status === "success") {
          // Filter only unpaid fines
          const unpaidFines = response.data.data.filter((fine) => fine.status === "unpaid");
          setFines(unpaidFines);
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

  // Update fine status to "paid"
  const updateFineStatus = async (fine_id) => {
    try {
      const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.fine_updat, {
        fine_id,
      });

      if (response.data.status === "success") {
        alert("Fine collected successfully!");

        // Remove the collected fine from the list
        setFines((prevFines) => prevFines.filter((fine) => fine.fine_id !== fine_id));
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Error updating fine status.");
    }
  };

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
      <input
        type="text"
        placeholder="🔍 Search by Enrollment No..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Fine List */}
      <ul className="book-list">
        {filteredFines.length > 0 ? (
          filteredFines.map((fine) => (
            <li key={fine.fine_id} className="book-item">
              <div className="user-info">
                <strong>{fine.EnrollmentNo}</strong> -{" "}
                <span>Book ID: {fine.book_id}</span> -{" "}
                <span>Due Date: {fine.due_date}</span> -{" "}
                <span className="fine-amount">₹{fine.fine_amount}</span> -{" "}
                <span>Status: {fine.status}</span>
              </div>
              <button className="btn" onClick={() => updateFineStatus(fine.fine_id)}>Collect</button>
            </li>
          ))
        ) : (
          <p className="no-users">No unpaid fines found.</p>
        )}
      </ul>
    </div>
  );
};

export default FineList;

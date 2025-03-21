import { useState } from "react";

const FineList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fines, setFines] = useState([
    { id: 1, user: "John Doe", book: "The Great Gatsby", fine: "$10" },
    { id: 2, user: "Jane Smith", book: "1984", fine: "$5" },
    { id: 3, user: "Mike Johnson", book: "Moby Dick", fine: "$15" },
  ]);

  // Filtered Fine List
  const filteredFines = fines.filter((fine) =>
    fine.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <h2>💰 Fine List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Fine List */}
      <ul className="book-list">
        {filteredFines.length > 0 ? (
          filteredFines.map((fine) => (
            <li key={fine.id} className="book-item">
              <div className="user-info">
                <strong>{fine.user}</strong> - <span>{fine.book}</span> - <span className="fine-amount">{fine.fine}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="no-users">No fines found.</p>
        )}
      </ul>
    </div>
  );
};

export default FineList;

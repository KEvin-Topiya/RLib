import { useState, useEffect } from "react";

const UserFine = () => {
  const [fines, setFines] = useState([]);

  // Dummy Data for Fines
  const dummyFines = [
    { id: 1, bookTitle: "The Great Gatsby", amount: 50 },
    { id: 2, bookTitle: "1984", amount: 30 },
    { id: 3, bookTitle: "To Kill a Mockingbird", amount: 40 },
  ];

  // Simulating API call using useEffect
  useEffect(() => {
    // const fetchFines = async () => {
    //   try {
    //     const response = await axios.get(`${CONFIG.DOMAIN}${CONFIG.API.FINES}`);
    //     setFines(response.data.data); // Assuming API response format: { data: [fines] }
    //   } catch (error) {
    //     console.error("Error fetching fines:", error);
    //   }
    // };

    // fetchFines(); // Uncomment when API is ready

    setFines(dummyFines); // Using dummy data for now
  }, []);

  return (
    <div className="fine-list-container">
      <h2>📌 Your Fines</h2>
      <ul className="book-list">
        {fines.length > 0 ? (
          fines.map((fine) => (
            <li key={fine.id} className="book-item">
              <div>
                <strong>{fine.bookTitle}</strong> - Fine: ₹{fine.amount}
              </div>
              <div className="buttons">
                <button className="update-btn">Pay Now</button>
              </div>
            </li>
          ))
        ) : (
          <p>No outstanding fines.</p>
        )}
      </ul>
    </div>
  );
};

export default UserFine;

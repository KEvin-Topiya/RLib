import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
  const [topUsers, setTopUsers] = useState([]);

  // Dummy issued books data
  const issuedBooks = [
    { id: 1, book_title: "The Great Gatsby", issued_to: "Alice", issued_date: "2025-03-10" },
    { id: 2, book_title: "1984", issued_to: "Bob", issued_date: "2025-03-12" },
    { id: 3, book_title: "Moby Dick", issued_to: "Alice", issued_date: "2025-02-15" },
    { id: 4, book_title: "To Kill a Mockingbird", issued_to: "Charlie", issued_date: "2025-03-18" },
    { id: 5, book_title: "Pride and Prejudice", issued_to: "Alice", issued_date: "2025-02-20" },
    { id: 6, book_title: "The Catcher in the Rye", issued_to: "Bob", issued_date: "2025-02-22" },
    { id: 7, book_title: "The Lord of the Rings", issued_to: "Alice", issued_date: "2025-02-25" },
  ];

  // Get current month (YYYY-MM format)
  const currentMonth = new Date().toISOString().slice(0, 7);

  // Process data to find top users
  useEffect(() => {
    const userCounts = {};

    // Count books issued per user in the current month
    issuedBooks.forEach((book) => {
      if (book.issued_date.startsWith(currentMonth)) {
        userCounts[book.issued_to] = (userCounts[book.issued_to] || 0) + 1;
      }
    });

    // Convert object to sorted array
    const sortedUsers = Object.entries(userCounts)
      .map(([user, count]) => ({ user, count }))
      .sort((a, b) => b.count - a.count);

    setTopUsers(sortedUsers);
  }, [currentMonth]);

  // Prepare data for the bar chart
  const chartData = {
    labels: topUsers.map((user) => user.user),
    datasets: [
      {
        label: "Books Issued",
        data: topUsers.map((user) => user.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderRadius: 8, // Rounded bars
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="analytics-container" style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📊 Top Users - Books Issued ({currentMonth})</h2>

      {topUsers.length > 0 ? (
        <div style={{ width: "300px", height: "200px", margin: "auto" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No books issued this month.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {topUsers.map((user, index) => (
          <li key={index} style={{ fontSize: "14px", margin: "5px 0", fontWeight: "bold" }}>
            {user.user}: {user.count} books
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;

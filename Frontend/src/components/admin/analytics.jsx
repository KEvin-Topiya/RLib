import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
  const [topUsers, setTopUsers] = useState([]);

  // Dummy issued books data
  const issuedBooks = [
    { id: 1, book_title: "The Great Gatsby", issued_to: "Vikas Meena", issued_date: "2025-05-10" },
    { id: 2, book_title: "1984", issued_to: "test", issued_date: "2025-05-12" },
    { id: 3, book_title: "Moby Dick", issued_to: "test", issued_date: "2025-05-15" },
    { id: 4, book_title: "To Kill a Mockingbird", issued_to: "Vikas Meena", issued_date: "2025-05-18" },
    { id: 5, book_title: "Pride and Prejudice", issued_to: "test", issued_date: "2025-05-20" },
    { id: 6, book_title: "The Catcher in the Rye", issued_to: "Renish Limbasiya", issued_date: "2025-05-22" },
    { id: 7, book_title: "The Lord of the Rings", issued_to: "Renish Limbasiya", issued_date: "2025-05-25" },
  ];

  useEffect(() => {
    const userCounts = {};

    const now = new Date();
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1); // Start of 3 months ago

    issuedBooks.forEach((book) => {
      const issuedDate = new Date(book.issued_date);

      if (issuedDate >= threeMonthsAgo && issuedDate <= now) {
        userCounts[book.issued_to] = (userCounts[book.issued_to] || 0) + 1;
      }
    });

    const sortedUsers = Object.entries(userCounts)
      .map(([user, count]) => ({ user, count }))
      .sort((a, b) => b.count - a.count);

    setTopUsers(sortedUsers);
  }, []);

  // Prepare data for the bar chart
  const chartData = {
    labels: topUsers.map((user) => user.user),
    datasets: [
      {
        label: "Books Issued",
        data: topUsers.map((user) => user.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderRadius: 8,
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
      <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>📊 Top Users - Books Issued (Last 3 Months)</h2>

      {topUsers.length > 0 ? (
        <div style={{ width: "300px", height: "200px", margin: "auto" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No books issued in the last 3 months.</p>
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

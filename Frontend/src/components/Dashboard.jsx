import React, { useEffect, useState } from "react";
import axios from "axios";
import { Book, Users, BookOpen, PlusCircle, BookUp, BookDown } from "lucide-react";
import { Link } from "react-router-dom";
import CONFIG from "../config";

export const Dashboard = ({actions,role}) => {
  const [dashboardData, setDashboardData] = useState(null); // Set initial state as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${CONFIG.DOMAIN}${CONFIG.API.DASH}`); // API call
        setDashboardData(response.data.data); // Store API response in state
        // console.log("API Response:", response.data); // Log response for debugging
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {/* Quick Actions */}
      <div className="quick dbdr">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions flx fw" style={{ gap: "1rem" }}>
        {actions.map((action) => (
        <Link
          key={action.label}
          to={action.path}
          className="btn flx"
          style={{ background: action.color }}
        >
          <action.icon className="icon" />
          {action.label}
        </Link>
      ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats">
        {dashboardData ? (
          [
            { path:"/"+role+"/books",title: "Total Books", value: dashboardData.total_books, icon: Book },
            { path:"/"+role+"/users",title: "Active Members", value: dashboardData.total_users, icon: Users },
            { path:"",title: "Books Borrowed", value: dashboardData.total_issued_books, icon: BookOpen },
            { path:"/"+role+"/home/borowed",title: "Due Returns", value: dashboardData.total_due_returns, icon: BookOpen },
          ].map((stat) => (
            <Link to={stat.path} key={stat.title} style={{textDecoration:"none",color:"black"}} className="card dbdr">
              <stat.icon className="icon blue" />
              <p className="value">{stat.value}</p>
              <p className="title">{stat.title}</p>
            </Link>
          ))
        ) : (
          <p>Loading statistics...</p>
        )}
      </div>

      {/* Recent Activities & Popular Books */}
      <div className="recent">
        <div className="recents dbdr">
          <h2>Recent Activities</h2>
          <div className="list">
            {/* Placeholder for recent activities */}
            <p style={{ color: "grey" }}>No recent activities available</p>
          </div>
        </div>

        {/* Popular Books Section */}
        <div className="recents">
          <h2>Popular Books</h2>
          <div className="book-list">
            {dashboardData?.popular_books?.length > 0 ? (
              dashboardData.popular_books.map((book) => (
                <div key={book.book_id} className="book flx jcsb" style={{ marginBottom: "1rem" }}>
                  <div>
                    <p className="book-title" style={{ fontWeight: "550" }}>{book.title}</p>
                    <p className="book-author" style={{ fontSize: "small", color: "grey" }}>{book.author}</p>
                  </div>
                  <div className="book-stats">
                    <p className="book-borrowed" style={{ fontSize: "small", color: "grey" }}>
                      {book.total_issued} times borrowed
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: "grey" }}>No popular books available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

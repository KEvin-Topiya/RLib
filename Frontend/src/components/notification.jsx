import { ArrowLeft } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CONFIG from "../config";

export default function Notifications() {
  const [role] = useState(sessionStorage.getItem("role"));
  const [showAll, setShowAll] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    console.log(sessionStorage.getItem("id"))
    try {
      const response = await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.Notification}`, {
        EnrollmentNo: sessionStorage.getItem("id"),
      });
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Function to handle opening a notification
  const handleOpenNotification = async (notification) => {
    setSelectedNotification(notification);
  
    if (notification.status === "unseen") {
      try {
        const response = await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.Notification}`, {
          EnrollmentNo: sessionStorage.getItem("id"),
          markAsSeenId: notification.id,
        });
  
        // Refresh the list with updated notifications
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error marking notification as seen:", error);
      }
    }
  };
  

  return (
    <div className="notifications-container">
      <Link to={`/${role}/home`} className="back flx">
        <ArrowLeft /> Back
      </Link>
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications
            .filter((notif) => showAll || notif.status === "unseen")
            .map((notification) => (
              <li 
                key={notification.id} 
                className={`notification-item ${notification.status}`} 
                onClick={() => handleOpenNotification(notification)}
              >
                <div className="notification-title">{notification.noti_title}</div>
                <p style={{ fontWeight: "normal", color: "#666" }}>&nbsp;&nbsp;{notification.description}</p>
              </li>
            ))}
        </ul>
      )}
{notifications.some((n) => n.status === "unseen") && (
  <button
    className="read-all-btn"
    onClick={async () => {
      try {
        const response = await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.Notification}`, {
          EnrollmentNo: sessionStorage.getItem("id"),
          readAll: true,
        });
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error marking all as read:", error);
      }
    }}
  >
    Mark All as Read
  </button>
)}

      <button onClick={() => setShowAll(!showAll)} className="all-notifications-btn">
        {showAll ? "Show Unseen Only" : "Show All Notifications"}
      </button>
      

      {selectedNotification && (
        <div className="dialog-overlay" onClick={() => setSelectedNotification(null)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedNotification.noti_title}</h3>
            <p>{selectedNotification.description}</p>
            <div className="notification-timestamp">{selectedNotification.created_at}</div>
            <button className="close-btn" onClick={() => setSelectedNotification(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

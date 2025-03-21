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
      setNotifications(response.data.data || []);
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
        await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.UPDATE_NOTIFICATION}`, { id: notification.id, status: "seen" });
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.id === notification.id ? { ...notif, status: "seen" } : notif
          )
        );
      } catch (error) {
        console.error("Error updating notification status:", error);
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
                <div className="notification-title">{notification.title}</div>
                <p style={{ fontWeight: "normal", color: "#666" }}>&nbsp;&nbsp;{notification.message}</p>
              </li>
            ))}
        </ul>
      )}

      <button onClick={() => setShowAll(!showAll)} className="all-notifications-btn">
        {showAll ? "Show Unseen Only" : "Show All Notifications"}
      </button>

      {selectedNotification && (
        <div className="dialog-overlay" onClick={() => setSelectedNotification(null)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedNotification.title}</h3>
            <p>{selectedNotification.message}</p>
            <div className="notification-timestamp">{selectedNotification.timestamp}</div>
            <button className="close-btn" onClick={() => setSelectedNotification(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

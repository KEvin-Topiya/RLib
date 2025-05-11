import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import CONFIG from "../config"; // Assuming you have a config file for the API URL

export const Header = ({ user }) => {
  const [notif, setNotif] = useState(" ");
  const [dp, setDp] = useState("");

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.dp}`, {
          id: user.name,
          role: user.role,
        });

        if (response.data.status === "success") {
          setDp(response.data.data.profile);
        } else {
          console.error("Failed to fetch profile:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className="header">
      <div className="flx jcsb">
        <img src="/logo2.png" alt="Logo" style={{ height: "2rem" }} />
        <div className="notification flx">
          <Link
            to={`/${user.role}/notification`}
            className="nbtn"
            style={{ "--notif": `'${notif}'` }}
          >
            <Bell className="bell-icon" />
          </Link>
          <img
            src={CONFIG.IMG+dp}
            alt="profile picture"
            className="userDp fbr"
          />
          <div className="user">
            <p className="name">{user.name}</p>
            <p className="role">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useEffect } from "react";
import { Edit } from "lucide-react";
import axios from "axios";
import CONFIG from "../config";

const Profile = ({ role }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.Profile, {
          id: role.name,
        });

        if (response.data.status === "success") {
          const userData = response.data.data;
          setUserData(userData);
          setProfilePicUrl(CONFIG.IMG + userData.profile);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Error fetching user profile.");
        console.error("Error:", err); // Debugging
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [role]);

  // Update password
  const handlePasswordChange = async () => {
    try {
      const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.ChangePassword, {
        EnrollmentNo: role.name,
        new_password: newPassword,
      });

      if (response.data.status === "success") {
        alert("Password updated successfully!");
        setShowPasswordForm(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Error updating password.");
    }
  };

  // Update profile picture
  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("EnrollmentNo", role.name);
      formData.append("profile", file);

      try {
        const response = await axios.post(
          CONFIG.DOMAIN + CONFIG.API.updateDp,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data.status === "success") {
          alert("Profile picture updated!");
          setProfilePicUrl(URL.createObjectURL(file));
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.error("Upload Error:", err);
        alert("Error updating profile picture.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="profile-wrapper">
      <div className="profile-header">
        <div className="profile-avatar">
          
          
          <label htmlFor="profilePicInput" className="profile-pic-label">
            <img src={profilePicUrl || "../../profile.png"} alt="User DP" />
            {sessionStorage.role !== "admin" && ( <Edit className="edit-icon" />)}
            </label>
            {sessionStorage.role !== "admin" && (
            <input
            id="profilePicInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleProfilePicChange}
            />
            )}
            
        </div>
        <h2 className="profile-name">{userData?.StudentName || "Unknown"}</h2>
        <p className="profile-role">{sessionStorage.role || "N/A"}</p>
      </div>

      <div className="profile-details">
        {userData &&
          Object.entries(userData).map(([key, value]) =>
            key !== "password" && key !== "profile" ? (
              <div key={key} className="detail-item">
                <span className="detail-key">{key.replace(/_/g, " ")}:</span>
                <span className="detail-value">{value || "N/A"}</span>
              </div>
            ) : null
          )}
      </div>

      <div className="profile-actions">
        {/* Hide Change Password for Admin Role */}
        {sessionStorage.role !== "admin" && (
          <button
            className="edit-btn"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            Change Password
          </button>
        )}
        {showPasswordForm && (
          <div className="password-form">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="password-input"
            />
            <button className="save-btn" onClick={handlePasswordChange}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

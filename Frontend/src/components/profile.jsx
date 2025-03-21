import { useState } from "react";

const Profile = ({role}) => {

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-pic">
          {role.dp ? (
            <img src={role.dp} alt="User DP" />
          ) : (
            <div className="placeholder-pic">👤</div>
          )}
        </div>

        <div className="profile-info">
          <h2>{role.name}</h2>
          <p className="role">{role.role}</p>
        </div>

        <div className="profile-actions">
          {/* <button className="edit-btn">Edit Profile</button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../../config";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${CONFIG.DOMAIN}${CONFIG.API.Fetch_user}`);
        setUsers(response.data.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.Delete_user}`, { EnrollmentNo:id });
      setUsers((prevUsers) => prevUsers.filter((user) => user.EnrollmentNo !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdate = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.EDIT_user}`, editingUser, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.data.status === "success") {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.EnrollmentNo === editingUser.EnrollmentNo ? editingUser : user))
        );
        setShowModal(false);
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  const filteredUsers = users.filter((user) =>
    user.StudentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-list-container">
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul className="book-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <li key={`${user.EnrollmentNo}-${user.Email || index}`} className="book-item">
              <div>
                <strong>{user.StudentName}</strong> - {user.ProgramName}
              </div>
              <div className="buttons">
                <button className="update-btn" onClick={() => handleUpdate(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user.EnrollmentNo)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </ul>

      {showModal && editingUser && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit User</h3>
            <label>Enrollment No:</label>
            <input type="text" value={editingUser.EnrollmentNo}
            onChange={(e) => setEditingUser({ ...editingUser,EnrollmentNo : e.target.value })} readOnly />

            <label>Student Name:</label>
            <input
              type="text"
              value={editingUser.StudentName}
              onChange={(e) => setEditingUser({ ...editingUser, StudentName: e.target.value })}
            />

            <label>Phone:</label>
            <input
              type="text"
              value={editingUser.PhoneStudent}
              onChange={(e) => setEditingUser({ ...editingUser, PhoneStudent: e.target.value })}
            />

            <label>Email:</label>
            <input
              type="email"
              value={editingUser.Email}
              onChange={(e) => setEditingUser({ ...editingUser, Email: e.target.value })}
            />

            <label>Email Alternate:</label>
            <input
              type="email"
              value={editingUser.EmailAlternate}
              onChange={(e) => setEditingUser({ ...editingUser, EmailAlternate: e.target.value })}
            />

            <label>Academic Year:</label>
            <input
              type="text"
              value={editingUser.AcademicYearName}
              onChange={(e) => setEditingUser({ ...editingUser, AcademicYearName: e.target.value })}
            />

            <label>Program Name:</label>
            <input
              type="text"
              value={editingUser.ProgramName}
              onChange={(e) => setEditingUser({ ...editingUser, ProgramName: e.target.value })}
            />

            <label>Semester:</label>
            <input
              type="text"
              value={editingUser.Semester}
              onChange={(e) => setEditingUser({ ...editingUser, Semester: e.target.value })}
            />

            <label>Password:</label>
            <input
              type="password"
              value={editingUser.password}
              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
            />

            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;

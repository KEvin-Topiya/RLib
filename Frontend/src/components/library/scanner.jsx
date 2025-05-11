import React, { useState, useEffect } from "react";
import axios from "axios";
import CONFIG from "../../config";

const Scanner = () => {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [role, setRole] = useState(sessionStorage.getItem("role") || "user");
  const [log, setLog] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLog();
  }, []);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Fetch log data
  const fetchLog = async () => {
    try {
      const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.entrylog);
      if (response.data.status === "success") {
        // Filter logs to include only today's entries
        const todayDate = getTodayDate();
        const todayLogs = response.data.data.filter((entry) =>
          entry.entry_time.startsWith(todayDate)
        );
        setLog(todayLogs);
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage("Error fetching log");
    }
  };

  // Handle the scan action
  const handleScan = async () => {
    if (!enrollmentNo) return alert("Please enter Enrollment No.");
    try {
      const response = await axios.post(CONFIG.DOMAIN + CONFIG.API.entry, {
        EnrollmentNo: enrollmentNo,
        role: role,
      });
      setMessage(response.data.message);
      fetchLog();
      setEnrollmentNo("");
    } catch (error) {
      setMessage("Error during scanning");
    }
  };

  return (
    <div className="scanner-container">
      <h2>📍 User Entry/Exit Scanner</h2>
      <input
        type="text"
        placeholder="Enter Enrollment No."
        value={enrollmentNo}
        onChange={(e) => setEnrollmentNo(e.target.value)}
        className="scanner-input"
      />
      <button onClick={handleScan} className="scanner-btn">Scan</button>
      {message && <p className="message">{message}</p>}
      
      <h3>Today's User Log</h3>
      <table className="log-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Enrollment No</th>
            <th>Entry Time</th>
            <th>Exit Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {log.length > 0 ? (
            log.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.EnrollmentNo}</td>
                <td>{entry.entry_time || "N/A"}</td>
                <td>{entry.exit_time || "N/A"}</td>
                <td>{entry.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No log data available for today</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Scanner;

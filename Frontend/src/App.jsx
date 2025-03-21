import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/login';
import Student from './pages/student';
import Librarian from './pages/librarian';
import Admin from './pages/admin';

function App() {
  const [role, setRole] = useState(sessionStorage.getItem("role") || null);

  useEffect(() => {
    setRole(sessionStorage.getItem("role"));
    // console.log("app:",role) // Update the role whenever it's changed in session storage
  },[setRole]);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login r={setRole} />} />

        {/* Role-Based Routes */}
        <Route path="/user/*" element={role === "user" ? <Student /> : <Navigate to="/" />} />
        <Route path="/librarian/*" element={role === "librarian" ? <Librarian /> : <Navigate to="/" />} />
        <Route path="/admin/*" element={role === "admin" ? <Admin /> : <Navigate to="/" />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

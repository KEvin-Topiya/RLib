import React, { useState } from "react";
import { Header } from "../components/Header";
import { Dashboard } from "../components/Dashboard";
import { Sidebar } from "../components/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Books from "../components/admin/books";
import NotFound from "./NotFound";
import UserList from "../components/admin/users";
import Adduser from "../components/admin/addLibrarian";
import Addexl from "../components/admin/addexl";
import AddBooks from "../components/admin/addbook";
import Return from "../components/admin/return";
import Logout from "./logout";

import { BookOpen, Users, BarChart2, Settings, Home, PlusCircle, BookUp, BookDown, UserRoundCog, ReceiptIndianRupee } from "lucide-react";
import Notifications from "../components/notification";
import AdminAnalytics from "../components/admin/analytics";
import IssuedBooksList from "../components/borowed";
import Profile from "../components/profile";
import FineList from "../components/fine";
export default function Admin() {
  const [user, setUser] = useState({
    name:sessionStorage.id,
    role:sessionStorage.role,
    dp: "",
  });

  const ni=[
    { icon: Home, label: "Home", path: "/admin/home" },
    { icon: BookOpen, label: "Books", path: "/admin/books" },
    { icon: Users, label: "Members", path: "/admin/users" },
    { icon: ReceiptIndianRupee, label: "Fine", path: "/admin/fine" },
    { icon: BarChart2, label: "Analytics", path: "/admin/analytics" },
    { icon: UserRoundCog, label: "Profile", path: "/admin/Profile" },
  ]

  const navigate = useNavigate();
  function l() {
    navigate("/admin/home");
  }

  const actionsData = [
    { icon: PlusCircle, label: "Add Excel", color: "#2463ea", path: "/admin/home/addexl" },
    { icon: PlusCircle, label: "Add Librarian", color: "#3b82f6", path: "/admin/home/addlib" },
    { icon: BookUp, label: "Add Books", color: "#10b981", path: "/admin/home/addbook" },
    { icon: BookDown, label: "Return Book", color: "#9333ea", path: "/admin/home/return" },
  ];
  return (
    <div className="flx">
      <Sidebar
        name={sessionStorage.getItem("role")}
        navitem={ni}
      />
      <div className="main hvh wf " style={{ background: "#f0f1f3" }}>
        <Header name={user.name} role={user.role} dp={user.dp} />
        <Routes>
          <Route index path="/home" element={<Dashboard role={user.role} actions={actionsData}/>} />
          <Route path="/home/addlib" element={<Adduser role={user.role} />} />
          <Route path="/home/addexl" element={<Addexl role={user.role} />} />
          <Route path="/home/addbook" element={<AddBooks role={user.role} />} />
          <Route path="/home/return" element={<Return role={user.role} />} />
          <Route path="/home/borowed" element={<IssuedBooksList role={user.role} />} />
          <Route path="/notification" element={<Notifications role={user.role} />} />
          <Route path="/fine" element={<FineList role={user.role} />} />
          <Route path="/analytics" element={<AdminAnalytics  />} />
          <Route path="/Profile" element={<Profile role={user} />} />

          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<NotFound rut={"/admin/home"} />} />
        </Routes>
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}

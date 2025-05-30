import React, { useState } from "react";
import { Header } from "../components/Header";
import { Dashboard } from "../components/Dashboard";
import { Sidebar } from "../components/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Books from "../components/admin/books";
import NotFound from "./NotFound";
import UserList from "../components/admin/users";
import Addexl from "../components/admin/addexl";
import AddBooks from "../components/admin/addbook";
import Return from "../components/admin/return";
import Logout from "./logout";
import Grid3DPreview from "./Library3DView";
import GridEditor from "../components/3dLib/grideditor";

import { BookOpen, Users, Home, PlusCircle, BookUp, BookDown, UserRoundCog, ReceiptIndianRupee, Library } from "lucide-react";
import Notifications from "../components/notification";
import IssuedBooksList from "../components/borowed";
import FineList from "../components/fine";
import Profile from "../components/profile";
export default function Admin() {
  const [user, setUser] = useState({
    name:sessionStorage.id,
    role:sessionStorage.role,
    dp: "",
  });

  const ni=[
    { icon: Home, label: "Home", path: "/librarian/home" },
    { icon: BookOpen, label: "Books", path: "/librarian/books" },
    { icon: Users, label: "Members", path: "/librarian/users" },
    { icon: ReceiptIndianRupee, label: "Fine", path: "/librarian/fine" },
    { icon: UserRoundCog, label: "Profile", path: "/librarian/Profile" },
    { icon: Library, label: "Editor", path: "/librarian/library-map" },
    { icon: Library, label: "Viewr", path: "/librarian/Lib3dViewr" },
  ]

  const navigate = useNavigate();
  function l() {
    navigate("/librarian/home");
  }

  const actionsData = [
    { icon: PlusCircle, label: "Add Excel", color: "#2463ea", path: "/librarian/home/addexl" },
    { icon: BookUp, label: "Add Books", color: "#10b981", path: "/librarian/home/addbook" },
    { icon: BookDown, label: "Return Book", color: "#9333ea", path: "/librarian/home/return" },
  ];
  return (
    <div className="flx">
      <Sidebar
        name={sessionStorage.getItem("role")}
        navitem={ni}
      />
      <div className="main hvh wf " style={{ background: "#f0f1f3" }}>
        <Header user={user} />
        <Routes>
          <Route index path="/home" element={<Dashboard role={user.role} actions={actionsData} />} />
          <Route path="/home/addexl" element={<Addexl role={user.role}/>} />
          <Route path="/home/addbook" element={<AddBooks   role={user.role}  />} />
          <Route path="/home/return" element={<Return role={user.role} />} />
          <Route path="/home/borowed" element={<IssuedBooksList role={user.role} />} />
          <Route path="/notification" element={<Notifications role={user.role} />} />
          <Route path="/fine" element={<FineList role={user.role} />} />
          <Route path="/Profile" element={<Profile  role={user} />} />
          <Route path="/library-map" element={<GridEditor />} />
          <Route path="/Lib3dViewr" element={<Grid3DPreview />} />

          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<NotFound rut={"/librarian/home"} />} />
        </Routes>
        {/* <Dashboard /> */}
      </div>
    </div>
  );
}

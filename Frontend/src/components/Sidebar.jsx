import React from "react";
import { BookOpen, Users, BarChart2, Settings,  Library, Home, LogOutIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = ({name,navitem}) => {
  const navigate = useNavigate();


  return (
    <div className="sidebar hvh dbdr" style={{position:"relative"}}>
      <div className="header flx jcse">
        <Library className="icon" />
        <h1 className="title">Library_{name}</h1>
      </div>
      <nav className="nav">
        <div className="nav-items">
          {navitem.map(item => (
            <NavLink to={item.path} key={item.label} className={`nbr navbtn flx ${({ isActive }) =>isActive ? "active" : ""}`}>
              <item.icon className="icon" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          <button className="logout  flx jcc" onClick={() => navigate("/logout")}>Log out  <LogOutIcon/></button>
        </div>
      </nav>
    </div>
  );
};

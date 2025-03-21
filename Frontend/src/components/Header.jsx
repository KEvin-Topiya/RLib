import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = ({name,role,dp} ) => {
  const [notif,setNotif]=useState(" ")
  const img=dp==""?"../../profile.png":dp
  return (
    <header className="header ">
      <div className=" flx jcsb" >
        <img src="/logo2.png" style={{height:"2rem"}}/>
        <div className="notification flx">
          <Link to={"/"+role+"/notification"} className="nbtn" style={{'--notif':`'${notif}'`}}>
            <Bell className="bell-icon" />
          </Link>
            <img
              src={img}
              alt="profile picture"
              className="userDp fbr"
            />
            <div className="user">
              <p className="name">{sessionStorage.id}</p>
              <p className="role">{sessionStorage.role}</p>
            </div>
        </div>
      </div>
    </header>
  );
};

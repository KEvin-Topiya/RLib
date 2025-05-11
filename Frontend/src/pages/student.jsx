import { Header } from "../components/Header";
import { Route, Routes } from "react-router-dom";
import IssueBooks from "../components/user/home";
import { Sidebar } from "../components/Sidebar";
import NotFound from "./NotFound";

import { BookOpen, Users, BarChart2, Settings,  Library, Home, LogOutIcon, ReceiptIndianRupee, UserRoundCog } from "lucide-react";
import Notifications from "../components/notification";
import Profile from "../components/profile";
import { useState } from "react";
import UserFine from "../components/user/userfine";
import Grid3DFromJSON from "./Library3DView";
export default function Student() {
  
  const ni=[
    { icon: Home, label: "Home", path: "/user/home" },
    { icon: ReceiptIndianRupee, label: "Fine", path: "/user/fine" },
    { icon: UserRoundCog, label: "Profile", path: "/user/Profile" },
    { icon: Library, label: "Viewr", path: "/user/Lib3dViewr" },
  ]
  
  const [user, setUser] = useState({
    name: sessionStorage.id,
    role: "user",
    
  });
  return (

    
    <div className="flx" >
      
      <Sidebar name={sessionStorage.getItem("role")} navitem={ni}/>
      <div className="main hvh wf " style={{background:"#f0f1f3"}}>
      <Header  user={user}/>
        <Routes>
            <Route path="/home" element={<IssueBooks />} />
            <Route path="/notification" element={<Notifications />} />
            <Route path="/*" element={<NotFound rut={"/user/home"}/>}/>
            <Route path="/Profile" element={<Profile role={user} />} />
            <Route path="/fine" element={<UserFine role={user} />} />
            <Route path="/Lib3dViewr" element={<Grid3DFromJSON  />} />
        </Routes>
          {/* <Dashboard /> */}
      </div>
    </div>


  )
}
{/* <div> */}
{/* <Header name="kevin" role="user" dp={"../kill.png"}/> */}
{/* <Routes> */}
    {/* <Route path="/home" element={<IssueBooks />} /> */}
{/* </Routes> */}
{/* </div> */}
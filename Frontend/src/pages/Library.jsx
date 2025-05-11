import { Header } from "../components/Header";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import NotFound from "./NotFound";

import {  Library, Home,} from "lucide-react";
import { useState } from "react";
import Grid3DFromJSON from "./Library3DView";
import Scanner from "../components/library/scanner";
export default function Lib() {
  
  const ni=[
    { icon: Home, label: "Home", path: "/library/home" },
    { icon: Library, label: "Viewr", path: "/library/Lib3dViewr" },
  ]
  
  const [user, setUser] = useState({
    name: sessionStorage.id,
    role: sessionStorage.role,
    
  });
  return (

    
    <div className="flx" >
      <Sidebar name={"library"} navitem={ni}/>
      <div className="main hvh wf " style={{background:"#f0f1f3"}}>
      <Header  user={user}/>
        <Routes>
            <Route path="/home" element={<Scanner />} />
            <Route path="/*" element={<NotFound rut={"/user/home"}/>}/>
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
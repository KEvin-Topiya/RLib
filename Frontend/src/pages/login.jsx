import CONFIG from "../config";
import {
  RiUserLine,
  RiMailLine,
  // RiPhoneLine,
  // RiCalendarLine,
  RiLockPasswordLine,
} from "react-icons/ri";
// import { BsBuildings } from "react-icons/bs";
// import { LuGraduationCap } from "react-icons/lu";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ r }) {
  const [formData, setFormData] = useState({
    // full_name: "",
    enrollment: "",
    email: "",
    // phone: "",
    // course: "",
    // course_year: "",
    // department: "",
    // current_address: "cad",
    // permanent_address: "Padd",
    // DOB: "0-1-2000",
    // password: "",
  });
  const [fpass, setfpass] = useState(false);
  const [error, setError] = useState("");
  // const [cpass, setCpass] = useState("");
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (fpass) {
    //   if (formData.password !== cpass) {
    //     setError("Passwords do not match.");
    //     return;
    //   }
    // }
    setError("");
  
  

      try {
        const url = fpass
        ? CONFIG.DOMAIN + "/User/Forget_Password.php"
        : CONFIG.DOMAIN + "/User/User_Login.php";
        const lg = fpass
        ? formData
        : {
          id: formData.enrollment,
          password: formData.password,
        };
        // console.log("Form submitted", lg);
        const response = await axios.post(url, lg, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (response.data.status != "success") {
          console.log(response.data)
          throw new Error(response.data.message);
        }
        if (!fpass) {
          alert("Login successful!");
          const role = response.data.user_role;
          const id = response.data.id;
          console.log(role)
          r(role)
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("id",id);
          console.log(id)
          // sessionStorage.setItem("role", "admin");
          if (role == "user") {
            navigate("/user/home");
          }else
          if (role == "librarian") {
            navigate("/librarian/home");
          }else
          if (role == "admin") {
            navigate("/admin/home");
          }else{
            // sessionStorage.setItem("role","library")
            navigate("/library/home")
          }
        } else {
          alert("Link Send to Your mail successful! reset and login.");
          setfpass(false);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form!");
      }
    
  };

  return (
    <div className="flx login hv">
      <div className="ll whvw hvh flx jcc" style={{backgroundImage:"url('../libwall.png')"}}>
        <div className=" flx jcc" style={{ flexDirection: "column" }}>
          <img className="nbr" src="./image.png" alt="" />
          <figcaption className="">Welcome to Our Library</figcaption>
          <p className="mt-1.5">
            Access the library online and issue from any device
          </p>
        </div>
      </div>
        <img src="logo2.png" className="lg" />
      <div className="rr whvw hvh flx jcc">
        <form onSubmit={handleSubmit}>
          <legend>{fpass ? "Forget Password" : "Login"}</legend>
          <br />
          <br />
          <div className="grd">
            <span>
              <RiUserLine />
              <input
                type="text"
                placeholder={"ID"}
                name="uid"
                value={formData.uid}
                onChange={(e) =>
                  setFormData({ ...formData, enrollment: e.target.value })
                }
                required
              />
            </span>
            {fpass && (
              <>
                {/*
                <span>
                  <RiUserLine />
                  <input
                    type="text"
                    placeholder="Full name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    required
                  />
                </span>
                 <span>
                  <RiPhoneLine />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </span>
                */}
                <span>
                  <RiMailLine />
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="mail"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </span>
                <p>
                  <b style={{ color: "red" }}>Note:</b>Email must which is use
                  in LMS
                </p>
              </>
            )}
            {fpass && (
              <>
                {/*
                <span>
                  <LuGraduationCap />
                  <input
                    type="text"
                    placeholder="Course"
                    name="course"
                    value={formData.course}
                    onChange={(e) =>
                      setFormData({ ...formData, course: e.target.value })
                    }
                    required
                  />
                </span>
                <span className="gh">
                  <RiCalendarLine />
                  <input
                    type="number"
                    placeholder="Year"
                    name="year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, course_year: e.target.value })
                    }
                    required
                  />
                </span>
                <span className="gh">
                  <BsBuildings />
                  <input
                    type="text"
                    placeholder="Department"
                    name="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    required
                  />
                </span>
                */}
              </>
            )}
            {!fpass && (
              <>
                <span>
                  <RiLockPasswordLine />
                  <input
                    type="password"
                    placeholder="Password"
                    id="pass"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </span>
                {/*
                <span>
                  <RiLockPasswordLine />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="cpass"
                    value={formData.confirmPassword}
                    onChange={(e) => setCpass(e.target.value)}
                  />
                </span>
                */}
              </>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}{" "}
            {/* Display error message */}
            <button type="submit" className="btn">
              {fpass ? <>Send Mail</> : <>Log in</>}
            </button>
            <p>
              
              {!fpass?"forget password?":""}
              <b
                onClick={() => {
                  setfpass(!fpass);
                }}
              >
                {!fpass?" click here":"Log In"}
              </b>
            </p>
            {/*
            {!fpass ? (
              <p>
                Don't have an account?{" "}
                <b
                  onClick={() => {
                    setfpass(!fpass);
                  }}
                >
                  Sign Up
                </b>
              </p>
            ) : (
              <p>
                Already have an account?
                <b
                  onClick={() => {
                    setfpass(!fpass);
                  }}
                >
                  Login
                </b>
              </p>
            )}
                    */}
          </div>
        </form>
      </div>
    </div>
  );
}

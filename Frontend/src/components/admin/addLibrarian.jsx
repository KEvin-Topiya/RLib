import {
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiCalendarLine,
  RiLockPasswordLine,
} from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, MapPinHouse } from "lucide-react";
import CONFIG from "../../config";

export default function Adduser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    EID: "",
    current_address: "cad",
    permanent_address: "Padd",
    DOB: "0-1-2000",
    password: "",
    user_role:"librarian"
  });
  const [signup, setsignup] = useState(false);
  const [error, setError] = useState("");
  const [cpass, setCpass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      
      console.log("Form submitted", formData);
      const response = await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.ADD_LIBRIAN}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.status != "success") {
        throw new Error(response.data.message);
      }
      
        alert("Add successful!");
        const role = response.data.user_role;
        navigate("/admin/home");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form!");
    }
  };

  return (
    <>
        <Link to="/admin/home" className="back flx"><ArrowLeft/> back</Link>
    <div className="flx login " style={{ marginTop: "1rem" }}>
      <div className="rr wf hf flx jcc">
        <form
          onSubmit={handleSubmit}
          style={{ background: "white", padding: "1rem", borderRadius: "5px" }}
          >
          <legend>{"Add Librarian"}</legend>
          <br />
          <br />
          <div className="grd">
            <>
              <span>
                <RiUserLine />
                <input
                  type="text"
                  placeholder="Full name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
                required
                />
              </span>
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
            </>
            <span>
              <RiUserLine />
              <input
                type="text"
                placeholder="ID"
                name="uid"
                value={formData.uid}
                onChange={(e) =>
                    setFormData({ ...formData, EID: e.target.value })
                }
                required
                />
            </span>
            <span>
              <MapPin />
              <input
                type="text"
                placeholder="Current _address"
                name="ca"
                value={formData.ca}
                onChange={(e) =>
                    setFormData({ ...formData, current_address: e.target.value })
                }
                required
                />
            </span>
            <span>
              <MapPinHouse />
              <input
                type="text"
                placeholder="parment_address"
                name="pa"
                value={formData.pa}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        permanent_address: e.target.value,
                    })
                }
                required
                />
            </span>
            <span className="gh">
              <RiCalendarLine />
              <input
                type="date"
                placeholder="DOB"
                name="year"
                value={formData.year}
                onChange={(e) =>
                    setFormData({ ...formData, DOB: e.target.value })
                }
                required
                />
            </span>
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
            <button type="submit" className="btn">
              Create an Librarian
            </button>
          </div>
        </form>
      </div>
    </div>
                </>
  );
}

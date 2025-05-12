import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookIcon,
  User,
} from "lucide-react";
import CONFIG from "../../config";

export default function Return({role}) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    book_id: "",
    EnrollmentNo:""
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      ;
      console.log("Form submitted", formData);
      const response = await axios.post(`${CONFIG.DOMAIN}${CONFIG.API.RETURN_BOOK}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.status != "success") {
        throw new Error(response.data.message);
      }
      
        alert("Book return successful!");
        navigate("/admin/home/return");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form!");
    }
  }
  return (
    <>
      <Link to={"/"+role+"/home"} className="back flx">
        <ArrowLeft /> back
      </Link>
      <div className="flx login " style={{ marginTop: "1rem" }}>
        <div className="rr wf hf flx jcc">
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "1rem",
              borderRadius: "5px",
            }}
          >
            <legend
              style={{ fontSize: "x-large" }}
            >Retrun Book</legend>
            <br />
            <br />
            <div className="grd">
              <span>
                <BookIcon />
                <input
                  type="text"
                  placeholder="Book Id"
                  name="book_id"
                  onChange={(e) =>
                    setFormData({ ...formData, book_id: e.target.value })
                }
                  required
                />
              </span>
               <span style={{ marginBottom: "1rem" }}>
                <User />
                <input
                  type="text"
                  placeholder="EnrollmentNo"
                  name="EnrollmentNo"
                  onChange={(e) =>
                    setFormData({ ...formData, EnrollmentNo: e.target.value })
                }
                  required
                />
              </span>
              <button type="submit" className="btn">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
}
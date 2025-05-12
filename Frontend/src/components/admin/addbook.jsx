import CONFIG from "../../config";
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
import { ArrowLeft, Book, Earth, MapPin, MapPinHouse, Tag } from "lucide-react";

export default function AddBooks({ role }) {
  const [formData, setFormData] = useState({
    book_id: "",
    title: "",
    author: "",
    isbn: "",
    publication_year: 0,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    try {
      const url = CONFIG.DOMAIN + "" + CONFIG.API.ADD_BOOK;
      console.log("Book added", formData);
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.status != "success") {
        throw new Error(response.data.message);
      }

      alert("Book Added successful!");
      const role = response.data.user_role;
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form!");
    }
  };

  return (
    <>
      <Link to={"/" + role + "/home"} className="back flx">
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
            <legend>{"Add Book"}</legend>
            <br />
            <br />
            <div className="grd">
              <>
                <span>
                  <Tag />
                  <input
                    type="text"
                    placeholder="Book ID"
                    name="id"
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({ ...formData, book_id: e.target.value })
                    }
                    required
                  />
                </span>
                <span>
                  <Book />
                  <input
                    type="text"
                    placeholder="Bookname"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </span>
                <span>
                  <Earth />
                  <input
                    type="tel"
                    placeholder="ISBN"
                    name="isbn"
                    value={formData.isbn}
                    onChange={(e) =>
                      setFormData({ ...formData, isbn: e.target.value })
                    }
                    required
                  />
                </span>
              </>
              <span>
                <RiUserLine />
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  required
                />
              </span>

              <span className="gh">
                <RiCalendarLine />
                <input
                  type="number"
                  placeholder="publish Year"
                  name="year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      publication_year: e.target.value,
                    })
                  }
                  required
                />
              </span>
              <button type="submit" className="btn">
                Create Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect, use } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookPlusIcon, FileSpreadsheet, UserPlus2Icon } from "lucide-react";
import CONFIG from "../../config";

const FileUpload = ({role}) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [hd, setHeader] = useState({});
  const [rol, setRol] = useState("books");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const allowedTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const fileName = selectedFile.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      if (allowedTypes.includes(fileType) || fileExtension === "xls" || fileExtension === "xlsx") {
        setFile(selectedFile);
        setError("");
      } else {
        setFile(null);
        setError("Invalid file type. Please upload an Excel file (.xls or .xlsx). ");
      }
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a valid Excel file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      console.log(rol)
      
     

      const response = await axios.post(rol=="books"?`${CONFIG.DOMAIN}${CONFIG.API.ExcelBOOK}`:`${CONFIG.DOMAIN}${CONFIG.API.ExcelUser}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

      if (response.data.status !== "success") {
        throw new Error(response.data.message);
      }

      alert("File uploaded successfully!");
      navigate("/admin/home");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeader(
      rol === "books"
        ? {
            book_id: "book123",
            title: "abc",
            author: "xyz",
            isbn: "978-1-107-50417-2",
            publication_year: "2000",
            quantity: "5",
            issued: "0",
            total_issued: "0",
          }
        : {
          "EnrollmentNo": "RUST-000001",
          "StudentName": "John Doe",
          "PhoneStudent": 1234567890,
          "Email": "john@example.com",
          "EmailAlternate": "john@alternate.com",
          "AcademicYearName": "2025-2026",
          "ProgramName": "Computer Science",
          "Semester": 1
      }
      
    );
  }, [rol]);

  return (
    <>
      <Link to={"/"+role+"/home"}  className="back flx">
        <ArrowLeft /> back
      </Link>
      <div className="flx login " style={{ marginTop: "1rem" }}>
        <div className="rr wf hf flx jcc">
          <form onSubmit={handleUpload} style={{ background: "white", padding: "1rem", borderRadius: "5px" }}>
            <legend style={{ fontSize: "x-large" }}>{`Add ${rol} Through Excel Sheet`}</legend>
            <br />
            <br />
            <div className="grd">
              <div className="rad">
                <input id="book" type="radio" checked={rol === "books"} onChange={() => setRol("books")} />
                <label htmlFor="book" className="flx">
                  <BookPlusIcon /> Books
                </label>
              </div>
              <div className="rad">
                <input id="user" type="radio" checked={rol === "users"} onChange={() => setRol("users")} />
                <label htmlFor="user" className="flx">
                  <UserPlus2Icon /> Users
                </label>
              </div>
              <span style={{ marginBottom: "1rem" }}>
                <FileSpreadsheet style={{ color: "black" }} />
                <input className="excel" type="file" accept=".xls,.xlsx" onChange={handleFileChange} required />
              </span>
              <button type="submit" className="btn" disabled={loading}>Upload</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
      <table className="tbl dbdr">
        <thead>
          <tr>
            <th className="head" colSpan={Object.keys(hd).length}>Format of {rol} Excel Sheet</th>
          </tr>
          <tr>
            {Object.keys(hd).map((key) => (
              <th key={key} className="border px-4 py-2 capitalize">{key.replace(/_/g, " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(hd).map((value, index) => (
              <td key={index} className="dbdr">{value}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FileUpload;

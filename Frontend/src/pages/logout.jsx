import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); 
    sessionStorage.clear(); 
    
    window.history.replaceState(null, "", "/");

    navigate("/", { replace: true });

    setTimeout(() => {
      window.location.reload(); 
    }, 100);
  }, [navigate]);

  return null; 
};

export default Logout;

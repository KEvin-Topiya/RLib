import { Link } from "react-router-dom";

const NotFound = ({rut}) => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Uh-oh! You seem lost in the void. 🚀</p>
      <p className="not-found-text">Let's get you back home before aliens find you! 👽</p>
      <Link to={rut} className="back-home">
        🏠 Beam Me Up!
      </Link>
    </div>
  );
};

export default NotFound;

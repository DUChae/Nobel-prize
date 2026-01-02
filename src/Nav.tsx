import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const location = useLocation(); // 현재 페이지 표시를 위해 추가

  return (
    <nav className="apple-navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          Nobel Explorer
        </Link>

        <div className="navbar-links">
          <Link
            className={`navbar-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
            to="/about"
          >
            About
          </Link>
          <Link
            className={`navbar-link ${
              location.pathname === "/contact" ? "active" : ""
            }`}
            to="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

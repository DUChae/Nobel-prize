import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div className="navbar">
      <Link to="/" className="navbarTitle">
        <h1>Nobel Winners</h1>
      </Link>
      <Link className="navbarMenu" to="/about">
        About
      </Link>
      <Link className="navbarMenu" to="/contact">
        Contact
      </Link>
    </div>
  );
}

export default Nav;

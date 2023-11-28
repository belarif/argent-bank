import React from "react";
import logo from "../assets/argentBankLogo.png";
import { Link } from "react-router-dom";

const Header = ({ token }) => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={"/"}>
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {token && token !== null ? (
          <Link className="main-nav-item" to={"/logout"}>
            <i className="fa fa-user-circle"></i>
            Sign Out
          </Link>
        ) : (
          <Link className="main-nav-item" to={"/login"}>
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;

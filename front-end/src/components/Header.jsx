import React from "react";
import logo from "../assets/argentBankLogo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutProfile } from "../features/login";
import { useNavigate } from "react-router-dom";

const Header = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    dispatch(logoutProfile());
    navigate("/");
  }

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
      <div className="main-nav-items">
        {token && token !== null ? (
          <Link className="main-nav-item" onClick={handleClick}>
            <i className="fa fa-user-circle"></i>
            Sign Out
          </Link>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
        <Link className="main-nav-item" to="/signup">
          <i className="fa fa-user-circle"></i>
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Header;

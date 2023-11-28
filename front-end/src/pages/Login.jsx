import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchOrUpdateToken } from "../features/login";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../utils/selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(loginSelector).token;
  const error = useSelector(loginSelector).error;

  useEffect(() => {
    if (token !== null) {
      navigate("/profile");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchOrUpdateToken(e.target.username.value, e.target.password.value)
    );
  };

  return (
    <React.Fragment>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <p style={{ color: "red" }}>{error ? error : ""}</p>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Login;

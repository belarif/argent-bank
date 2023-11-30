import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { fetchToken } from "../features/login";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector, userSelector } from "../utils/selectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(loginSelector).token;
  const error = useSelector(loginSelector).error;
  const success = useSelector(userSelector).success;

  useEffect(() => {
    if (token !== null) {
      navigate("/profile");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchToken(e.target.username.value, e.target.password.value));
  };

  return (
    <React.Fragment>
      <Header token={token} />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <p style={{ color: "red" }}>{error ? error : ""}</p>
          <p style={{ color: "green" }}>{success ? success : ""}</p>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="email" id="username" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password" required>
                Password
              </label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            <div className="sign-up-link">
              <Link to={"/signUp"}>Sign Up</Link>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Login;

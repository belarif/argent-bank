import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchOrUpdateToken, setCredentials } from "../features/token";
import { useStore } from "react-redux";

const Login = () => {
  const store = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCredentials(store, e);
    fetchOrUpdateToken(store);
  };

  return (
    <React.Fragment>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
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

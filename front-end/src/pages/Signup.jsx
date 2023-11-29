import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { signupUser } from "../features/signup";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../utils/selectors";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(userSelector).error;
  const success = useSelector(userSelector).success;

  useEffect(() => {
    if (success !== null) {
      navigate("/login");
    }
  }, [success, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;

    dispatch(signupUser(email, password, firstName, lastName));
  };

  return (
    <React.Fragment>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign Up</h1>
          <p style={{ color: "red" }}>{error ? error : ""}</p>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First name</label>
              <input type="text" id="firstName" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last name</label>
              <input type="text" id="lastName" required />
            </div>
            <button className="sign-in-button">Sign Up</button>
          </form>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Signup;

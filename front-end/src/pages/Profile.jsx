import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EditForm } from "../components/EditForm";
import { loginSelector } from "../utils/selectors";
import { useSelector } from "react-redux";
import { getUser } from "../features/user";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();
  const token = useSelector(loginSelector).token;

  useEffect(() => {
    try {
      const getUserProfile = async () => {
        const res = await getUser(token);
        setUserProfile(res.body);
      };

      getUserProfile();
      if (token === null) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, navigate]);

  return (
    <React.Fragment>
      <Header token={token} />
      <main className="main bg-dark">
        <div className="header">
          {userProfile && (
            <h1>
              Welcome back
              <br />
              {userProfile.firstName} {userProfile.lastName}
            </h1>
          )}
          <EditForm />
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;

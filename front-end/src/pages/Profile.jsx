import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditForm from "../components/EditForm";
import { selectUserData, selectToken, selectStatus } from "../utils/selectors";
import { useSelector } from "react-redux";
import { getUser } from "../features/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const userProfile = useSelector(selectUserData);
  const status = useSelector(selectStatus);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    dispatch(getUser(token, status));
  }, [dispatch, navigate, token, status]);

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
          <EditForm userProfile={userProfile} />
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

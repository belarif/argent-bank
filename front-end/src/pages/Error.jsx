import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Error = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="error-message">
        <h1>
          Error 404 ! <br />
          la page demandée n'existe pas
        </h1>
        <Link to="/">Retour à la page d'accueil</Link>
      </div>
      <Footer />
    </React.Fragment>
  );
};

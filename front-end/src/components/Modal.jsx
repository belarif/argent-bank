import React, { useState } from "react";

const Modal = () => {
  const [opened, setOpened] = useState(true);

  return (
    <React.Fragment>
      <div class="modal" style={opened === false ? { display: "none" } : {}}>
        <div class="modal-content">
          <div class="modal-btn">
            <button
              id="close-modal"
              onClick={() => {
                setOpened(false);
              }}
            >
              fermer
            </button>
          </div>
          <div class="tech-infos">
            <h2>Pour cette réalisation, j'ai utilisé :</h2>
            <ul>
              <li>Html5</li>
              <li>Css3</li>
              <li>React</li>
              <li>VsCode</li>
              <li>Postman</li>
              <li>API-rest</li>
              <li>Swagger-ui</li>
              <li>React-persist</li>
              <li>React-Tolkit</li>
              <li>Javacript</li>
              <li>Git & GitHub</li>
            </ul>
            <h2>
              Pour tester la connexion, saisissez les identifiants suivants :
            </h2>
            <ul>
              <li>Username : tony@stark.com</li>
              <li>Password : password123</li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;

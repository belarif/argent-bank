import { produce } from "immer";
import { createAction } from "@reduxjs/toolkit";
import { authenticationSelector } from "../utils/selectors";

const initialState = {
  status: "void",
  token: null,
  error: null,
  credentials: null,
};

// actions creators
export const tokenFetching = createAction("token/fetching");
export const tokenResolving = createAction("token/resolved");
export const tokenRejecting = createAction("token/rejected");
export const credentialsRetrieving = createAction(
  "credentials/retrieve",
  (email, password) => {
    return {
      payload: {
        email,
        password,
      },
    };
  }
);
export const credentialsVoid = createAction("credentials/void");

async function fetchOrUpdateToken(store) {
  const status = authenticationSelector(store.getState()).status;
  const credentials = authenticationSelector(store.getState()).credentials;

  if (status === "pending" || status === "updating") {
    return;
  }

  store.dispatch(tokenFetching());

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.status === 400) {
      store.dispatch(tokenRejecting("champs invalides"));
    }

    if (response.status === 500) {
      store.dispatch(tokenRejecting("Erreur interne du serveur"));
    }

    if (response.ok) {
      const data = await response.json();
      store.dispatch(tokenResolving(data.body.token));
    }

    return;
  } catch (error) {
    console.log(error);
    store.dispatch(tokenRejecting(error));
  }
}

function authenticationReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case tokenFetching.toString(): {
        if (draft.status === "void") {
          draft.status = "pending";
          return;
        }

        if (draft.status === "rejected") {
          draft.error = null;
          draft.status = "pending";
          return;
        }

        if (draft.status === "resolved") {
          draft.status = "updating";
          return;
        }

        return;
      }

      case tokenResolving.toString(): {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.token = action.payload;
          draft.status = "resolved";
          return;
        }
        return;
      }

      case tokenRejecting.toString(): {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected";
          draft.error = action.payload;
          draft.token = null;
          return;
        }
        return;
      }

      case credentialsRetrieving.toString(): {
        draft.credentials = action.payload;
        return;
      }

      case credentialsVoid.toString(): {
        draft.credentials = action.payload;
        return;
      }

      default:
        return;
    }
  });
}

function setCredentials(store, e) {
  const email = e.target.username.value;
  const password = e.target.password.value;

  try {
    // ajout : vérifier d'abord si le token est généré avant d'enregistrer les credentials
    if (!email || !password) {
      store.dispatch(credentialsVoid(null));
      return;
    }
    store.dispatch(credentialsRetrieving(email, password));
  } catch (error) {
    console.log(error);
  }
}

export { fetchOrUpdateToken, authenticationReducer, setCredentials };

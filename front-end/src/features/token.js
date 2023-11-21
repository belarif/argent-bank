import { produce } from "immer";
import { authenticationSelector } from "../utils/selectors";

const initialState = {
  status: "void",
  token: null,
  error: null,
  credentials: {},
};

const TOKEN_FETCHING = "token/fetching";
const TOKEN_RESOLVED = "token/resolved";
const TOKEN_REJECTED = "token/rejected";
const CREDENTIALS_RETRIEVING = "credentials/retrieve";
const CREDENTIALS_VOID = "credentials/void";

const tokenFetching = () => ({ type: TOKEN_FETCHING });
const tokenResolving = (token) => ({ type: TOKEN_RESOLVED, payload: token });
const tokenRejecting = (error) => ({ type: TOKEN_REJECTED, payload: error });
const credentialsRetrieving = (credentials) => ({
  type: CREDENTIALS_RETRIEVING,
  payload: credentials,
});
const credentialsVoid = (credentials) => ({
  type: CREDENTIALS_VOID,
  payload: credentials,
});

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

    const data = await response.json();
    store.dispatch(tokenResolving(data.body.token));
  } catch (error) {
    console.log(error);
    store.dispatch(tokenRejecting(error));
  }
}

function authenticationReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TOKEN_FETCHING: {
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

      case TOKEN_RESOLVED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.token = action.payload;
          draft.status = "resolved";
          return;
        }
        return;
      }

      case TOKEN_REJECTED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected";
          draft.error = action.payload;
          draft.token = null;
          return;
        }
        return;
      }

      case CREDENTIALS_RETRIEVING: {
        draft.credentials = action.payload;
        return;
      }

      case CREDENTIALS_VOID: {
        draft.credentials = action.payload;
        return;
      }

      default:
        return;
    }
  });
}

function getFormData(store, e) {
  const formDataCredentials = {
    email: e.target.username.value,
    password: e.target.password.value,
  };

  try {
    if (!formDataCredentials.email || !formDataCredentials.password) {
      store.dispatch(credentialsVoid({}));
      return;
    }
    store.dispatch(credentialsRetrieving(formDataCredentials));
  } catch (error) {
    console.log(error);
  }
}

export { fetchOrUpdateToken, authenticationReducer, getFormData };

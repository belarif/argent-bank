import { produce } from "immer";
import { selectToken } from "../utils/selectors";

const initialState = {
  status: "void",
  token: null,
  error: null,
};

const FETCHING = "token/fetching";
const RESOLVED = "token/resolved";
const REJECTED = "token/rejected";

const tokenFetching = () => ({ type: FETCHING });
const tokenResolving = (token) => ({ type: RESOLVED, payload: token });
const tokenRejecting = (error) => ({ type: REJECTED, payload: error });

export async function fetchOrUpdateToken(store) {
  const status = selectToken(store.getState()).status;

  if (status === "pending" || status === "updating") {
    return;
  }

  store.dispatch(tokenFetching());

  try {
    const dataUser = {
      email: "tony@stark.com",
      password: "password123",
    };

    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });

    const data = await response.json();
    store.dispatch(tokenResolving(data.body.token));
  } catch (error) {
    console.log(error);
    store.dispatch(tokenRejecting(error));
  }
}

export default function tokenReducer(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCHING: {
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

      case RESOLVED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.token = action.payload;
          draft.status = "resolved";
          return;
        }
        return;
      }

      case REJECTED: {
        if (draft.status === "pending" || draft.status === "updating") {
          draft.status = "rejected";
          draft.error = action.payload;
          draft.token = null;
          return;
        }
        return;
      }

      default:
        return;
    }
  });
}

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "void",
  token: null,
  error: null,
  credentials: {},
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    fetching: (state) => {
      if (state.status === "void") {
        state.status = "pending";
        return;
      }

      if (state.status === "rejected") {
        state.error = null;
        state.status = "pending";
        return;
      }

      if (state.status === "resolved") {
        state.status = "updating";
        return;
      }
    },

    resolving: {
      prepare: (email, password, token) => ({
        payload: { email, password, token },
      }),

      reducer: (state, action) => {
        if (state.status === "pending" || state.status === "updating") {
          state.status = "resolved";
          state.token = action.payload.token;
          state.credentials.email = action.payload.email;
          state.credentials.password = action.payload.password;
          return;
        }
      },
    },

    rejecting: (state, action) => {
      if (state.status === "pending" || state.status === "updating") {
        state.status = "rejected";
        state.error = action.payload;
        state.token = null;
        return;
      }
    },
  },
});

export async function fetchOrUpdateToken(dispatch, status, email, password) {
  if (status === "pending" || status === "updating") {
    return;
  }

  const credentials = {
    email: email,
    password: password,
  };

  dispatch(fetching());

  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(resolving(email, password, data.body.token));
    }

    if (response.status === 400) {
      dispatch(rejecting("champs invalides"));
    }

    if (response.status === 500) {
      dispatch(rejecting("Erreur interne du serveur"));
    }

    return;
  } catch (error) {
    console.log(error);
    dispatch(rejecting(error));
  }
}

const { actions, reducer } = authenticationSlice;
export const { fetching, resolving, rejecting } = actions;
export default reducer;

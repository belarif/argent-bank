import { createSlice } from "@reduxjs/toolkit";
import { loginSelector } from "../utils/selectors";

const initialState = {
  status: "void",
  token: null,
  error: null,
  credentials: {},
};

const { actions, reducer } = createSlice({
  name: "login",
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

    logouting: (state) => {
      if (state.status === "resolved") {
        state.status = initialState.status;
        state.token = initialState.token;
        state.error = initialState.error;
        state.credentials = {};
      }
    },
  },
});

export function fetchOrUpdateToken(email, password) {
  return async (dispatch, getState) => {
    const status = loginSelector(getState()).status;

    if (status === "pending" || status === "updating") {
      return;
    }

    dispatch(actions.fetching());

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(actions.resolving(email, password, data.body.token));
      }

      if (response.status === 400) {
        dispatch(actions.rejecting("champs invalides"));
      }

      if (response.status === 500) {
        dispatch(actions.rejecting("Erreur interne du serveur"));
      }

      return;
    } catch (error) {
      console.log(error);
      dispatch(actions.rejecting(error));
    }
  };
}

export function logoutProfile() {
  return async (dispatch) => {
    dispatch(actions.logouting());
  };
}

export default reducer;

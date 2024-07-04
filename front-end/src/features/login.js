import { createSlice } from "@reduxjs/toolkit";
import { selectLoginStatus } from "../utils/selectors";
import { getUser } from "./user";
import { resetUserInitialState } from "./user";

const initialState = {
  status: "void",
  token: null,
  success: null,
  error: null,
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
      prepare: (success, token) => ({
        payload: { success, token },
      }),

      reducer: (state, action) => {
        if (state.status === "pending" || state.status === "updating") {
          state.status = "resolved";
          state.token = action.payload.token;
          state.success = action.payload.success;
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

    resetingState: (state) => {
      if (state.status === "resolved") {
        state.status = initialState.status;
        state.token = initialState.token;
        state.success = initialState.success;
        state.error = initialState.error;
      }
    },
  },
});

export function getToken(email, password) {
  return async (dispatch) => {
    const status = selectLoginStatus;

    if (status === "pending" || status === "updating") {
      return;
    }

    dispatch(actions.fetching());

    try {
      const response = await fetch(
        "https://argent-bank-back-end.vercel.app/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const res = await response.json();
        dispatch(actions.resolving(res.message, res.body.token));
        dispatch(getUser(res.body.token));
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

export function logout() {
  return async (dispatch) => {
    dispatch(actions.resetingState());
    dispatch(resetUserInitialState);
  };
}

export default reducer;

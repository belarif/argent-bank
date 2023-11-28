import { createSlice } from "@reduxjs/toolkit";
import { signupSelector } from "../utils/selectors";

const initialState = {
  status: "void",
  error: null,
  success: null,
};

const { actions, reducer } = createSlice({
  name: "signup",
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

    resolving: (state, action) => {
      if (state.status === "pending" || state.status === "updating") {
        state.status = "resolved";
        state.success = action.payload;
        return;
      }
    },

    rejecting: (state, action) => {
      if (state.status === "pending" || state.status === "updating") {
        state.status = "rejected";
        state.error = action.payload;
        return;
      }
    },
  },
});

export default reducer;

export function signupUser(email, password, firstName, lastName) {
  return async (dispatch, getState) => {
    const status = signupSelector(getState()).status;

    if (status === "pending" || status === "updating") {
      return;
    }

    dispatch(actions.fetching());
    try {
      const req = await fetch("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
        }),
      });

      const res = await req.json();

      if (res.status === 400) {
        dispatch(actions.rejecting(res.message));
      }

      if (res.status === 200) {
        dispatch(actions.resolving(res.message));
      }

      return res;
    } catch (error) {
      console.log(error);
      dispatch(actions.rejecting(error));
    }
  };
}

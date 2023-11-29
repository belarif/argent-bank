import { createSlice } from "@reduxjs/toolkit";
import { userSelector } from "../utils/selectors";
import { loginSelector } from "../utils/selectors";

const initialState = {
  status: "void",
  error: null,
  success: null,
  userData: {},
};

const { actions, reducer } = createSlice({
  name: "user",
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
      prepare: (success, email, password, firstName, lastName) => ({
        payload: { success, email, password, firstName, lastName },
      }),

      reducer: (state, action) => {
        if (state.status === "pending" || state.status === "updating") {
          state.status = "resolved";
          state.success = action.payload.success;
          state.userData.email = action.payload.email;
          state.userData.password = action.payload.password;
          state.userData.firstName = action.payload.firstName;
          state.userData.lastName = action.payload.lastName;

          return;
        }
      },
    },

    rejecting: (state, action) => {
      if (state.status === "pending" || state.status === "updating") {
        state.status = "rejected";
        state.error = action.payload;
        return;
      }
    },

    updating: {
      prepare: (success, email, password, firstName, lastName) => ({
        payload: { success, email, password, firstName, lastName },
      }),

      reducer: (state, action) => {
        if (state.status === "pending" || state.status === "updating") {
          state.status = "resolved";
          state.success = action.payload.success;
          state.userData.email = action.payload.email;
          state.userData.password = action.payload.password;
          state.userData.firstName = action.payload.firstName;
          state.userData.lastName = action.payload.lastName;

          return;
        }
      },
    },
  },
});

export default reducer;

export function signupUser(email, password, firstName, lastName) {
  return async (dispatch, getState) => {
    const status = userSelector(getState()).status;

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
        dispatch(
          actions.resolving(res.message, email, password, firstName, lastName)
        );
      }

      return res;
    } catch (error) {
      console.log(error);
      dispatch(actions.rejecting(error));
    }
  };
}

export function updateProfile(email, password, firstName, lastName) {
  return async (dispatch, getState) => {
    const token = loginSelector(getState()).token;
    const status = userSelector(getState()).status;

    if (status === "pending" || status === "updating") {
      return;
    }

    dispatch(actions.fetching());

    try {
      const req = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });

      const res = await req.json();

      if (res.status === 200) {
        dispatch(
          actions.updating(res.message, email, password, firstName, lastName)
        );
      }

      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

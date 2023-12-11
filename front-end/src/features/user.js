import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "void",
  userData: {},
  success: null,
  error: null,
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
        state.status = "pending";
        state.error = null;
        return;
      }

      if (state.status === "resolved") {
        state.status = "updating";
        return;
      }
    },

    resolving: {
      prepare: (success, userData) => ({
        payload: { success, userData },
      }),

      reducer: (state, action) => {
        if (state.status === "pending" || state.status === "updating") {
          state.status = "resolved";
          state.userData = action.payload.userData;
          state.success = action.payload.success;
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
      prepare: (success, firstName, lastName) => ({
        payload: { success, firstName, lastName },
      }),

      reducer: (state, action) => {
        if (state.status === "pending" || state.status === "updating") {
          state.status = "resolved";
          state.userData.firstName = action.payload.firstName;
          state.userData.lastName = action.payload.lastName;
          state.success = action.payload.success;
          return;
        }
      },
    },

    resetingState: (state) => {
      if (state.status === "resolved") {
        state.status = initialState.status;
        state.userData = initialState.userData;
        state.success = initialState.success;
      }
    },
  },
});

export function getUser(token) {
  return async (dispatch) => {
    dispatch(actions.fetching());

    try {
      const req = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await req.json();

      if (res.status === 200) {
        dispatch(actions.resolving(res.message, res.body));
      }

      if (res.status === 400) {
        dispatch(actions.rejecting(res.message));
      }

      return;
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(firstName, lastName, token) {
  return async (dispatch) => {
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
        dispatch(actions.updating(res.message, firstName, lastName));
      }

      return res;
    } catch (error) {
      console.log(error);
      dispatch(actions.rejecting(error));
    }
  };
}

export const resetUserInitialState = actions.resetingState();
export default reducer;

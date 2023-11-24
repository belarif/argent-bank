import { authenticationReducer } from "../features/authentication.js";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

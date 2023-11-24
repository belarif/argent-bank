import authenticationReducer from "../features/authentication";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

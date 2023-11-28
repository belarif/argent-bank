import loginReducer from "../features/login";
import signupReducer from "../features/signup";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
  },
});

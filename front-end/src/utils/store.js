import loginReducer from "../features/login";
import userReducer from "../features/signup";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});

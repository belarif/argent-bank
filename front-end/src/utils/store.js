import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login";
import userReducer from "../features/user";

export default configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});

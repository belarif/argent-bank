import loginReducer from "../features/login";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});

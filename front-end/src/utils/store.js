import { authenticationReducer } from "../features/authentication.js";
import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import { legacy_createStore as createStore } from "redux";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

// const reducer = combineReducers({
//   authentication: authenticationReducer,
// });

// const reduxDevtools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const store = createStore(reducer, reduxDevtools);
// export default store;

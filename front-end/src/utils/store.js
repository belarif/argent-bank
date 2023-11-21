import { authenticationReducer } from "../features/token.js";
import { combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";

const reducer = combineReducers({
  authentication: authenticationReducer,
});

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, reduxDevtools);
export { store };

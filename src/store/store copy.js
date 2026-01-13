import { applyMiddleware, combineReducers, createStore } from "redux";
import translationReducer from "./translationSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootStore = combineReducers( {
  translationState: translationReducer
})
const store = createStore(rootStore, composeWithDevTools(applyMiddleware(thunk)));

export default store;

import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./translationSlice";
const store = configureStore({
  reducer: {
    translationState: translationReducer,
  },
});


export default store;

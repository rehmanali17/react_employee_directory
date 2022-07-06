import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "store/authSlice";

const reducer = combineReducers({
    auth,
});

const store = configureStore(
    {
        reducer,
    },
    composeWithDevTools()
);

export default store;

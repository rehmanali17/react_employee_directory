import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "store/authSlice";
import user from "store/userSlice";

const reducer = combineReducers({
    auth,
    user,
});

const store = configureStore(
    {
        reducer,
    },
    composeWithDevTools()
);

export default store;

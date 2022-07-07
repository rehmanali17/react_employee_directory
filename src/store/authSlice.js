import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "config/supabase";

const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

// Slice
const slice = createSlice({
    name: "auth",
    initialState: {
        user,
        requestError: {
            isError: false,
            message: "",
        },
        inProgress: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.requestError = {
                isError: false,
                message: "",
            };
            state.inProgress = false;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        loginFailed: (state, action) => {
            state.user = null;
            state.requestError = action.payload;
            state.inProgress = false;
        },
        requestInitiated: state => {
            state.inProgress = true;
        },
    },
});

export default slice.reducer;

// Actions
const { loginSuccess, loginFailed, requestInitiated } = slice.actions;

export const login = values => async dispatch => {
    try {
        dispatch(requestInitiated());
        const { data: user, error } = await supabase.auth.signIn(values);
        if (error) {
            dispatch(loginFailed({ isError: true, message: error.message }));
        } else {
            dispatch(loginSuccess(user));
        }
    } catch (e) {
        dispatch(loginFailed({ isError: true, message: e.message }));
    }
};

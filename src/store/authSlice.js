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
        requestInitiated: state => {
            state.inProgress = true;
        },
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
        signupSuccess: (state, action) => {
            state.user = action.payload;
            state.requestError = {
                isError: false,
                message: "",
            };
            state.inProgress = false;
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        signupFailed: (state, action) => {
            state.user = null;
            state.requestError = action.payload;
            state.inProgress = false;
        },
        logout: state => {
            localStorage.removeItem("user");
            return {
                ...state,
                user: null,
                requestError: {
                    isError: false,
                    message: "",
                },
                inProgress: false,
            };
        },
    },
});

export default slice.reducer;

// Actions
const {
    requestInitiated,
    loginSuccess,
    loginFailed,
    signupSuccess,
    signupFailed,
    logout,
} = slice.actions;

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

export const signup = values => async dispatch => {
    try {
        dispatch(requestInitiated());
        const { user, error } = await supabase.auth.update({
            password: values.password,
            data: { name: values.name, company_name: values.companyName },
        });
        if (error) {
            dispatch(signupFailed({ isError: true, message: error.message }));
        } else {
            dispatch(signupSuccess(user));
        }
    } catch (e) {
        dispatch(signupFailed({ isError: true, message: e.message }));
    }
};

export { logout };

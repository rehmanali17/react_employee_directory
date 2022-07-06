import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "config/supabase";

// Slice
const slice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        requestError: {
            isError: false,
            message: "",
        },
        inProgress: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            return {
                ...state,
                user: action.payload,
                requestError: {
                    isError: false,
                    message: "",
                },
                inProgress: false,
            };
        },
        loginFailed: (state, action) => {
            return {
                ...state,
                user: null,
                requestError: action.payload,
                inProgress: false,
            };
        },
        requestInitiated: state => {
            return {
                ...state,
                inProgress: true,
            };
        },
    },
});

export default slice.reducer;

// Actions
const { loginSuccess, loginFailed, requestInitiated } = slice.actions;

export const login = values => async dispatch => {
    try {
        dispatch(requestInitiated());
        let { data: user, error } = await supabase.auth.signIn(values);
        if (error) {
            dispatch(loginFailed({ isError: true, message: error.message }));
        } else {
            dispatch(loginSuccess(user));
        }
    } catch (e) {
        dispatch(loginFailed({ isError: true, message: e.message }));
    }
};

import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "config/supabase";

const user = supabase.auth.session() ? supabase.auth.session().user : null;

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
            state.user = action.payload.user;
            state.requestError = {
                isError: false,
                message: "",
            };
            state.inProgress = false;
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
        },
        signupFailed: (state, action) => {
            state.user = null;
            state.requestError = action.payload;
            state.inProgress = false;
        },
        resetPasswordSuccess: (state, action) => {
            state.user = action.payload;
            state.requestError = {
                isError: false,
                message: "",
            };
            state.inProgress = false;
        },
        resetPasswordFailed: (state, action) => {
            state.user = null;
            state.requestError = action.payload;
            state.inProgress = false;
        },
        logout: state => {
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
    resetPasswordSuccess,
    resetPasswordFailed,
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

export const resetPassword = values => async dispatch => {
    try {
        dispatch(requestInitiated());
        const { user, error } = await supabase.auth.update({
            password: values.password,
        });
        if (error) {
            dispatch(
                resetPasswordFailed({ isError: true, message: error.message })
            );
        } else {
            dispatch(resetPasswordSuccess(user));
        }
    } catch (e) {
        dispatch(resetPasswordFailed({ isError: true, message: e.message }));
    }
};

export const logoutInitiated = () => async dispatch => {
    try {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            dispatch(logout());
        } else {
            throw new Error("Unable to logout");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

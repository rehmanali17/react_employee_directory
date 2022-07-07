import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "config/supabase";

// Slice
const slice = createSlice({
    name: "user",
    initialState: {
        users: [],
        requestError: {
            isError: false,
            message: "",
        },
        alert: {
            type: "",
            message: "",
        },
        isAddingUser: false,
        inProgress: false,
    },
    reducers: {
        requestInitiated: state => ({ ...state, inProgress: true }),
        fetchSuccess: (state, action) => ({
            ...state,
            users: action.payload,
            requestError: {
                isError: false,
                message: "",
            },
            inProgress: false,
        }),
        fetchError: (state, action) => ({
            ...state,
            users: [],
            requestError: action.payload,
            inProgress: false,
        }),

        addUserRequestInitiated: state => ({
            ...state,
            isAddingUser: true,
        }),
        addUserSuccess: (state, action) => ({
            ...state,
            users: [...state.users, action.payload],
            alert: {
                type: "success",
                message: "Invite sent successfully",
            },
            isAddingUser: false,
        }),
        addUserError: (state, action) => ({
            ...state,
            alert: {
                type: "error",
                message: action.payload,
            },
            isAddingUser: false,
        }),

        dismissAlert: state => ({
            ...state,
            alert: {
                type: "",
                message: "",
            },
        }),
    },
});

export default slice.reducer;

// Actions
const {
    requestInitiated,
    fetchSuccess,
    fetchError,

    addUserRequestInitiated,
    addUserSuccess,
    addUserError,

    dismissAlert,
} = slice.actions;

export const fetchUsers = () => async dispatch => {
    try {
        dispatch(requestInitiated());
        const { data: users, error } = await supabase.auth.api.listUsers();
        if (error) {
            dispatch(fetchError({ isError: true, message: error.message }));
        } else {
            dispatch(fetchSuccess(users));
        }
    } catch (e) {
        dispatch(fetchError({ isError: true, message: e.message }));
    }
};

export const addUser = values => async dispatch => {
    try {
        dispatch(addUserRequestInitiated());
        const { data: user, error } = await supabase.auth.api.inviteUserByEmail(
            values.email,
            { redirectTo: `${process.env.REACT_APP_URL}/signup` }
        );
        setTimeout(() => {
            dispatch(dismissAlert());
        }, 1500);
        if (error) {
            dispatch(addUserError(error.message));
        } else if (user) {
            dispatch(addUserSuccess(user));
        }
    } catch (e) {
        dispatch(addUserError(e.message));
    }
};

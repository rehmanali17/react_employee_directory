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
        addUserSuccess: (state, action) => {
            let userPassed = false;
            let userExists = false;

            if (action.payload.user) {
                userPassed = true;
                for (const user of state.users) {
                    if (user.email === action.payload.user.email) {
                        userExists = true;
                        break;
                    }
                }
            }

            return {
                ...state,
                users:
                    !userExists && userPassed
                        ? [...state.users, action.payload.user]
                        : state.users,
                alert: {
                    type: "success",
                    message: action.payload.message,
                },
                isAddingUser: false,
            };
        },
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
        const { data } = await supabase.functions.invoke("list-users");
        if (data.status === 200) {
            dispatch(fetchSuccess(data.users));
        } else {
            dispatch(fetchError({ isError: true, message: data.message }));
        }
    } catch (e) {
        dispatch(fetchError({ isError: true, message: e.message }));
    }
};

export const addUser = values => async dispatch => {
    try {
        dispatch(addUserRequestInitiated());
        const { data } = await supabase.functions.invoke("invite-user", {
            body: JSON.stringify({
                email: values.email,
                role: values.role,
                redirectURi: `${process.env.REACT_APP_URL}/signup`,
            }),
        });
        if (data.status === 200) {
            dispatch(
                addUserSuccess({
                    user: data.user,
                    message: "Invite sent successfully",
                })
            );
            setTimeout(() => {
                dispatch(dismissAlert());
            }, 2500);
        } else if (data.status === 422) {
            const { error } = await supabase.auth.api.resetPasswordForEmail(
                values.email,
                {
                    redirectTo: `${process.env.REACT_APP_URL}/signup`,
                }
            );
            if (error) {
                dispatch(addUserError(error.message));
            } else {
                dispatch(
                    addUserSuccess({ message: "Invite sent successfully" })
                );
                setTimeout(() => {
                    dispatch(dismissAlert());
                }, 2500);
            }
        } else {
            dispatch(addUserError(data.message));
        }
    } catch (e) {
        dispatch(addUserError(e.message));
    }
};

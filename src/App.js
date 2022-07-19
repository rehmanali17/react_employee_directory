import React from "react";
import Login from "views/Login";
import PasswordRecovery from "views/PasswordRecovery";
import Regisration from "views/Registration";
import UserListing from "views/dashboard/UserListing";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import ProtectedRoutes from "components/ProtectedRoutes";
import EditProfile from "views/dashboard/EditProfile";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3554D1",
        },
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route index element={<EditProfile />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Regisration />} />
                    <Route
                        path="recover-password"
                        element={<PasswordRecovery />}
                    />
                    <Route path="home" element={<ProtectedRoutes />}>
                        <Route index element={<UserListing />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </Provider>
    );
}

export default App;

import React from "react";
import Login from "views/Login";
import PasswordRecovery from "views/PasswordRecovery";
import Regisration from "views/Registration";
import UserListing from "views/dashboard/UserListing";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3554D1",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<UserListing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Regisration />} />
                <Route
                    path="/recover-password"
                    element={<PasswordRecovery />}
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;

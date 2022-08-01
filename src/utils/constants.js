import React from "react";
import Login from "views/Login";
import Regisration from "views/Registration";
import PasswordRecovery from "views/PasswordRecovery";
import UserListing from "views/dashboard/UserListing";
import { Route } from "react-router-dom";
import EditProfile from "views/dashboard/EditProfile";

export const routes = {
    public: [
        <Route key={0} index element={<Login />} />,
        <Route key={1} path="signup" element={<Regisration />} />,
        <Route
            key={2}
            path="recover-password"
            element={<PasswordRecovery />}
        />,
    ],
    protected: [
        <Route key={0} index element={<UserListing />} />,
        <Route key={1} path="edit-profile" element={<EditProfile />} />,
    ],
};

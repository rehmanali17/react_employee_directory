import React, { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "store/authSlice";
import CustomMenu from "./Menu";
import CustomButton from "./Button";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";

const CustomAppBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElement, setAnchorElement] = useState(null);
    const { user } = useSelector(state => state.auth);
    const open = Boolean(anchorElement);

    const handleCloseMenu = () => {
        setAnchorElement(null);
    };

    const onLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const menus = {
        role: {
            title: "SUPER_ADMIN",
            icon: <AssignmentIndIcon fontSize="small" />,
        },
        items: [
            {
                text: "Logout",
                icon: <LogoutIcon fontSize="small" />,
                command: onLogout,
            },
        ],
    };

    const handleClick = event => {
        setAnchorElement(event.currentTarget);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton> */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Employee Directory
                    </Typography>
                    <CustomButton
                        type="button"
                        variant="text"
                        icon={<PersonIcon />}
                        onClick={handleClick}
                        color="inherit"
                        displayText={user.user.email}
                        styles={{
                            width: "fit-content",
                            color: "white",
                            mr: "auto !important",
                        }}
                    />
                    <CustomMenu
                        anchorElement={anchorElement}
                        onClose={handleCloseMenu}
                        open={open}
                        menus={menus}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default CustomAppBar;

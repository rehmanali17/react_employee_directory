import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "store/authSlice";

const CustomAppBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    ></IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Employee Directory
                    </Typography>
                    <Button onClick={handleClick} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default CustomAppBar;

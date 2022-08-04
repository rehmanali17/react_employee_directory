import React, { useState } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    CircularProgress,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "components/Button";
import { logoutInitiated } from "store/authSlice";
import { useNavigate } from "react-router-dom";

const styles = {
    boxContainer: { flexGrow: 1 },
    iconBtn: { mr: 2 },
    appTitle: { flexGrow: 1 },
    btn: { color: "white" },
    menu: { width: 180 },
    menuItem: { width: "100%" },
    listItem: { textAlign: "center" },
    loader: {
        width: "1.25rem !important",
        height: "1.25rem !important",
        p: "0 .5rem",
    },
};

export default function MenuAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggingOut, setLoggingOut] = useState(false);
    const [anchorElement, setAnchorElement] = useState(null);
    const { user } = useSelector(state => state.auth);

    const handleMenu = event => {
        setAnchorElement(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElement(null);
    };

    const handleRedirect = () => {
        setAnchorElement(null);
        navigate("/home/edit-profile");
    };

    const handleLogout = () => {
        setLoggingOut(true);
        dispatch(logoutInitiated())
            .then(() => {
                navigate("/");
                setAnchorElement(null);
            })
            .finally(() => {
                setLoggingOut(false);
            });
    };

    return (
        <Box sx={styles.boxContainer}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={styles.iconBtn}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={styles.appTitle}
                    >
                        Employee Directory
                    </Typography>
                    <div>
                        <CustomButton
                            onClick={handleMenu}
                            displayText={user.email}
                            styles={styles.btn}
                            icon={<AccountCircle />}
                        />
                        <Menu
                            PaperProps={{
                                style: styles.menu,
                            }}
                            id="menu-appbar"
                            anchorEl={anchorElement}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElement)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleRedirect}>
                                <ListItemText sx={styles.listItem}>
                                    Profile
                                </ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemText sx={styles.listItem}>
                                    {isLoggingOut ? (
                                        <CircularProgress sx={styles.loader} />
                                    ) : (
                                        "Logout"
                                    )}
                                </ListItemText>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

import React, { useState, useEffect } from "react";
import {
    Grid,
    Box,
    Stack,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Checkbox,
    CircularProgress,
} from "@mui/material";
import IconedTextInput from "components/IconedTextInput";
// import SelectField from "components/SelectField";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
// import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
// import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CustomButton from "components/Button";
import DialogBox from "components/DialogBox";
import { fetchUsers } from "store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "components/Alert";

const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
    },
    loader: {
        width: "3rem !important",
        height: "3rem !important",
    },
    usersCountContainer: {
        width: "100vw",
        boxSizing: "border-box",
        p: "1rem 2rem",
    },
    totalUser: {
        width: "100%",
        height: "fit-content",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btnContainer: {
        position: "relative",
        top: "-1rem",
    },
    btn: {
        cursor: "pointer",
        bgcolor: "primary.main",
    },
    inputContainer: {
        height: "fit-content",
        width: "100%",
        p: ".5rem 1.5rem",
        m: "1rem 0 2rem",
        bgcolor: "#FBFBFF",
        borderRadius: "0.5rem",
    },
    alertContainer: {
        width: "100vw",
        height: "10vh",
        display: "grid",
        placeItems: "center",
        p: "0 1rem",
    },
    usersListContainer: {
        width: "100%",
        height: "56vh",
        overflow: "auto",
    },
    tableContainer: {
        boxShadow: "none !important",
    },
    table: { minWidth: 650 },
    tableRow: {
        "&:last-child": {
            border: "none !important",
        },
        cursor: "pointer",
        "&:hover": {
            bgcolor: "#EEF3FE",
        },
    },
    textAlignment: {
        textAlign: "center",
    },
    roleCell: {
        width: "40%",
        textAlign: "center",
    },
    statusIndicator: {
        border: "1px solid #E5E7F1",
        width: "fit-content",
        p: ".25rem 1rem",
        borderRadius: ".375rem",
    },
};

const UserListing = () => {
    const dispatch = useDispatch();
    const { inProgress, users, requestError } = useSelector(
        state => state.user
    );
    const { user } = useSelector(state => state.auth);

    // const [rowCount, setRowCount] = useState(25);
    const [isOpenedDialogBox, setOpenDialogBox] = useState(false);
    const [role, setRole] = useState("ADMIN");

    // const handleRowCountChange = event => {
    //     const { value } = event.target;
    //     setRowCount(value);
    // };

    const handleRoleChange = event => {
        const { value } = event.target;
        setRole(value);
    };

    const openDialogBox = () => {
        setOpenDialogBox(true);
    };

    const closeDialogBox = () => {
        setOpenDialogBox(false);
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    // const selectFieldOptions = ["25", "50", "100"];
    const userRolesOptions = [
        "ADMIN",
        "MANAGER",
        "MEMBER",
        "TRAINEE",
        "CANDIDATE",
    ];

    return (
        <>
            {inProgress ? (
                <Grid sx={styles.container}>
                    <CircularProgress sx={styles.loader} />
                </Grid>
            ) : (
                <>
                    <DialogBox
                        value={role}
                        onChange={handleRoleChange}
                        onCloseDialogBox={closeDialogBox}
                        roles={userRolesOptions}
                        open={isOpenedDialogBox}
                    />
                    <Grid container sx={styles.userCountContainer}>
                        <Grid sx={styles.totalUser}>
                            <Stack>
                                <Typography variant="h2" component="p">
                                    Users
                                </Typography>
                                <Typography>
                                    Total Members: {users.length || 0}
                                </Typography>
                            </Stack>
                            {user.user_metadata.role === "SUPER_ADMIN" && (
                                <Grid sx={styles.btnContainer}>
                                    <CustomButton
                                        type="button"
                                        displayText="Invite User"
                                        icon={<AddCircleOutlinedIcon />}
                                        variant="contained"
                                        styles={styles.btn}
                                        onClick={openDialogBox}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Grid sx={styles.inputContainer}>
                            <IconedTextInput />
                        </Grid>
                        {requestError.isError || !users.length ? (
                            <Grid sx={styles.alertContainer}>
                                <AlertMessage
                                    severity="error"
                                    message={
                                        requestError.isError
                                            ? requestError.message
                                            : "No user exists in the records"
                                    }
                                />
                            </Grid>
                        ) : (
                            <>
                                <Grid sx={styles.usersListContainer}>
                                    <TableContainer
                                        component={Paper}
                                        sx={styles.tableContainer}
                                    >
                                        <Table
                                            sx={styles.table}
                                            aria-label="Users Listing table"
                                        >
                                            <TableBody>
                                                {users.map(user => (
                                                    <TableRow
                                                        key={user.id}
                                                        sx={styles.tableRow}
                                                    >
                                                        <TableCell>
                                                            <Checkbox />
                                                        </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {user[
                                                                "user_metadata"
                                                            ]["name"] || ""}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={
                                                                styles.textAlignment
                                                            }
                                                        >
                                                            {user.email}
                                                        </TableCell>
                                                        <TableCell
                                                            sx={styles.roleCell}
                                                        >
                                                            {
                                                                user[
                                                                    "user_metadata"
                                                                ]["role"]
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            sx={
                                                                styles.textAlignment
                                                            }
                                                        >
                                                            <Box
                                                                sx={
                                                                    styles.statusIndicator
                                                                }
                                                                component="div"
                                                            >
                                                                {user.email_confirmed_at
                                                                    ? "Active"
                                                                    : "Pending Request"}
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell
                                                            sx={
                                                                styles.textAlignment
                                                            }
                                                        >
                                                            13 minutes ago
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                {/* <Grid
                                    sx={{
                                        height: "fit-content",
                                        width: "100%",
                                        p: "1rem 1.5rem",
                                        m: "2rem 0 1rem",
                                        bgcolor: "#FBFBFF",
                                        borderRadius: "0.5rem",
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Typography>
                                        1-{users.length} of {users.length}
                                    </Typography>
                                    <Grid
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1.5rem",
                                        }}
                                    >
                                        <Typography>Rows per page:</Typography>
                                        <SelectField
                                            value={rowCount}
                                            onChange={handleRowCountChange}
                                            options={selectFieldOptions}
                                        />
                                        <CustomButton
                                            icon={<ArrowBackOutlinedIcon />}
                                            styles={{
                                                width: "fit-content",
                                                border: "1px solid #E5E7F1",
                                            }}
                                        />
                                        <CustomButton
                                            icon={<ArrowForwardOutlinedIcon />}
                                            styles={{
                                                width: "fit-content",
                                                border: "1px solid #E5E7F1",
                                            }}
                                        />
                                    </Grid>
                                </Grid> */}
                            </>
                        )}
                    </Grid>
                </>
            )}
        </>
    );
};

export default UserListing;

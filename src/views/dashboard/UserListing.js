import React, { useState } from "react";
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
} from "@mui/material";
import IconedTextInput from "components/IconedTextInput";
import SelectField from "components/SelectField";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import CustomButton from "components/Button";
import DialogBox from "components/DialogBox";

const UserListing = () => {
    const [rowCount, setRowCount] = useState(25);
    const [isOpenedDialogBox, setOpenDialogBox] = useState(false);
    const [role, setRole] = useState("ADMIN");

    const handleRowCountChange = event => {
        const { value } = event.target;
        setRowCount(value);
    };

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

    const selectFieldOptions = ["25", "50", "100"];
    const userRolesOptions = [
        "ADMIN",
        "MANAGER",
        "MEMBER",
        "TRAINEE",
        "CANDIDATE",
    ];

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
        createData(
            "Rehman Ali",
            "rehmanmalik17@gmail.com",
            "Admin",
            "Active",
            "13 minutes ago"
        ),
    ];

    return (
        <>
            <DialogBox
                value={role}
                onChange={handleRoleChange}
                onCloseDialogBox={closeDialogBox}
                roles={userRolesOptions}
                open={isOpenedDialogBox}
            />
            <Grid
                container
                sx={{
                    width: "100vw",
                    boxSizing: "border-box",
                    p: "1rem 2rem",
                }}
            >
                <Grid
                    sx={{
                        width: "100%",
                        height: "fit-content",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Stack>
                        <Typography variant="h2" component="p">
                            Users
                        </Typography>
                        <Typography>38 users</Typography>
                    </Stack>
                    <Grid sx={{ position: "relative", top: "-1rem" }}>
                        <CustomButton
                            type="button"
                            displayText="Invite User"
                            icon={<AddCircleOutlinedIcon />}
                            variant="contained"
                            styles={{
                                cursor: "pointer",
                                bgcolor: "primary.main",
                            }}
                            onClick={openDialogBox}
                        />
                    </Grid>
                </Grid>
                <Grid
                    sx={{
                        height: "fit-content",
                        width: "100%",
                        p: ".5rem 1.5rem",
                        m: "1rem 0 2rem",
                        bgcolor: "#FBFBFF",
                        borderRadius: "0.5rem",
                    }}
                >
                    <IconedTextInput />
                </Grid>
                <Grid
                    sx={{
                        width: "100%",
                        height: "56vh",
                        overflow: "auto",
                    }}
                >
                    <TableContainer
                        component={Paper}
                        sx={{
                            boxShadow: "none !important",
                        }}
                    >
                        <Table
                            sx={{ minWidth: 650 }}
                            aria-label="Users Listing table"
                        >
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            "&:last-child": {
                                                border: "none !important",
                                            },
                                            cursor: "pointer",
                                            "&:hover": {
                                                bgcolor: "#EEF3FE",
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.calories}
                                        </TableCell>
                                        <TableCell width="40%" align="center">
                                            {row.fat}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box
                                                sx={{
                                                    border: "1px solid #E5E7F1",
                                                    width: "fit-content",
                                                    p: ".25rem 1rem",
                                                    borderRadius: ".375rem",
                                                }}
                                                component="div"
                                            >
                                                {row.carbs}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.protein}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid
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
                    <Typography>1-5 of 23</Typography>
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
                </Grid>
            </Grid>
        </>
    );
};

export default UserListing;

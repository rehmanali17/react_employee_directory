import React from "react";
import {
    Grid,
    Box,
    Stack,
    Typography,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Checkbox,
    TextField,
    MenuItem,
} from "@mui/material";
import IconedTextInput from "components/IconedTextInput";

const UserListing = () => {
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
        <Grid
            container
            sx={{
                width: "100vw",
                boxSizing: "border-box",
                p: "2rem",
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
                    <Button variant="contained">Invite User</Button>
                </Grid>
            </Grid>
            <Grid
                sx={{
                    height: "fit-content",
                    width: "100%",
                    p: "1rem 1.5rem",
                    m: "1.5rem 0",
                    bgcolor: "#FBFBFF",
                    borderRadius: "0.5rem",
                }}
            >
                <IconedTextInput />
            </Grid>
            <Grid
                sx={{
                    width: "100%",
                    height: "50vh",
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
                            {rows.map(row => (
                                <TableRow
                                    key={row.name}
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
                    p: "1.5rem",
                    m: "2rem 0",
                    bgcolor: "#FBFBFF",
                    borderRadius: "0.5rem",
                    display: "flex",
                }}
            >
                <Typography flexGrow="3">1-5 of 23</Typography>
                <Grid
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: ".75rem",
                    }}
                >
                    <Typography>Rows per page:</Typography>
                    <TextField
                        select
                        value={50}
                        sx={{
                            "& .MuiInputBase-input": {
                                p: ".25rem 2.5rem",
                                color: "#6D7382",
                                fontSize: "1rem",
                                borderColor: "#E5EBF0",
                            },
                        }}
                    >
                        <MenuItem>25</MenuItem>
                        <MenuItem>50</MenuItem>
                        <MenuItem>100</MenuItem>
                    </TextField>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserListing;

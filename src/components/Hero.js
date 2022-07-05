import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Sheet from "assets/sheet.png";

const Hero = () => {
    return (
        <Grid
            sx={{
                width: "50vw",
                position: "relative",
                boxSizing: "border-box",
                padding: "15vh 5% 0",
                background: "#2F54EB",
            }}
        >
            <Grid
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                <Typography variant="h3" component="p" color="white">
                    Designed for Individuals
                </Typography>
                <Typography variant="p" color="#8198F3">
                    See the analytics and grow your data remotely, from anywhere
                </Typography>
            </Grid>
            <Box
                component="img"
                sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    width: "30rem",
                    height: "30rem",
                }}
                alt="The employee directory"
                src={Sheet}
            />
        </Grid>
    );
};

export default Hero;

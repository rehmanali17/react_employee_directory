import React from "react";
import { Grid, TextField, Typography, InputLabel } from "@mui/material";
import PropTypes from "prop-types";

const TextInput = props => {
    return (
        <Grid sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <InputLabel>{props.label}</InputLabel>
            <TextField
                fullWidth
                name={props.name}
                type={props.type}
                sx={{
                    "& .MuiInputBase-input": {
                        p: ".5rem .75rem",
                        color: "#6D7382",
                        fontSize: "1rem",
                        borderColor: "#E5EBF0",
                    },
                }}
                variant="outlined"
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
            <Typography
                sx={{
                    alignSelf: "flex-end",
                    position: "relative",
                    top: "-.25rem",
                    fontSize: ".75rem",
                    fontWeight: "bold",
                    color: "red",
                }}
            >
                {props.error && props.touched ? props.error : ""}
            </Typography>
        </Grid>
    );
};

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
};

export default TextInput;
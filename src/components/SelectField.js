import React from "react";
import { TextField, MenuItem } from "@mui/material";
import PropTypes from "prop-types";

const SelectField = props => {
    return (
        <TextField
            select
            value={props.value}
            onChange={props.onChange}
            sx={{
                "& .MuiInputBase-input": {
                    p: ".25rem .75rem",
                    color: "#6D7382",
                    fontSize: "1rem",
                    borderColor: "#E5EBF0",
                },
                ...props.styles,
            }}
        >
            {props.options.map((option, index) => (
                <MenuItem value={option} key={index}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
};

SelectField.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    styles: PropTypes.object,
};

export default SelectField;

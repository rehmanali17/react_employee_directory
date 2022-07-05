import React from "react";
import { TextField } from "@mui/material";
// import PropTypes from "prop-types";

const IconedTextInput = () => {
    return (
        <TextField
            fullWidth
            sx={{
                "& .MuiInputBase-input": {
                    p: ".75rem",
                    color: "#6D7382",
                    fontSize: "1rem",
                    borderColor: "#E5EBF0",
                },
            }}
        />
    );
};

// TextInput.propTypes = {
//     label: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     value: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
//     onBlur: PropTypes.func.isRequired,
//     error: PropTypes.string.isRequired,
//     touched: PropTypes.bool.isRequired,
// };

export default IconedTextInput;

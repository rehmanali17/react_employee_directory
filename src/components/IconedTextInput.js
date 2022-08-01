import React from "react";
import { TextField } from "@mui/material";
// import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const styles = {
    textField: {
        "& .MuiInputBase-input": {
            p: ".5rem",
            color: "#6D7382",
            fontSize: "1rem",
            borderColor: "#E5EBF0",
        },
    },
};

const IconedTextInput = () => {
    return (
        <TextField
            fullWidth
            sx={styles.textField}
            InputProps={{
                startAdornment: <SearchIcon />,
                endAdornment: <FormatListBulletedIcon />,
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

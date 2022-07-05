import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const CustomButton = props => {
    return (
        <>
            <Button
                type={props.type}
                disableFocusRipple
                disableRipple
                fullWidth
                sx={{ bgcolor: "primary.main" }}
                variant="contained"
            >
                {props.displayText}
            </Button>
        </>
    );
};

CustomButton.propTypes = {
    displayText: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default CustomButton;

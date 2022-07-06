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
                variant={props.variant}
                startIcon={props.icon}
                sx={props.styles}
                onClick={props.onClick}
                disabled={props.isDisabled}
            >
                {props.displayText}
            </Button>
        </>
    );
};

CustomButton.propTypes = {
    displayText: PropTypes.string,
    type: PropTypes.string,
    variant: PropTypes.string,
    icon: PropTypes.element,
    styles: PropTypes.object,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
};

export default CustomButton;

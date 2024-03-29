import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";

const CustomAvatar = props => {
    const styles = {
        avatar: {
            width: props.size,
            height: props.size,
            m: ".5rem auto",
            backgroundSize: "contain",
            border: ".125rem solid #818791",
        },
    };

    return <Avatar src={props.src} sx={styles.avatar} />;
};

CustomAvatar.propTypes = {
    src: PropTypes.string,
    size: PropTypes.number,
};

export default CustomAvatar;

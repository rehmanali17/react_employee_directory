import React from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Grid,
} from "@mui/material";
import PropTypes from "prop-types";
import TextInput from "components/TextInput";
import SelectField from "components/SelectField";
import CustomButton from "components/Button";

const DialogBox = props => {
    return (
        <Grid>
            <Dialog
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "25rem",
                            p: "1rem",
                        },
                    },
                }}
                open={props.open}
            >
                <DialogTitle sx={{ textAlign: "center" }}>
                    Send New User Invitation
                </DialogTitle>
                <DialogContent>
                    <TextInput />
                    <SelectField
                        value={props.value}
                        onChange={props.onChange}
                        styles={{ width: "100%", mt: "1rem" }}
                        options={props.roles}
                    />
                </DialogContent>
                <DialogActions>
                    <CustomButton
                        variant="outlined"
                        styles={{
                            width: "fit-content",
                            p: ".125rem .5rem",
                            cursor: "pointer",
                        }}
                        onClick={props.onCloseDialogBox}
                        displayText="Cancel"
                    />
                    <CustomButton
                        variant="outlined"
                        styles={{
                            width: "fit-content",
                            p: ".125rem .5rem",
                            mr: "1rem",
                            cursor: "pointer",
                        }}
                        displayText="Send"
                    />
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

DialogBox.propTypes = {
    open: PropTypes.bool,
    roles: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onCloseDialogBox: PropTypes.func,
};

export default DialogBox;

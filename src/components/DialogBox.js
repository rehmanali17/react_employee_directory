import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Grid,
    CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";
import TextInput from "components/TextInput";
import SelectField from "components/SelectField";
import CustomButton from "components/Button";
import { Formik } from "formik";
import { inviteUserSchema } from "schema/invite_user";
import AlertMessage from "./Alert";
import { addUser } from "store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const styles = {
    dialogBox: {
        "& .MuiDialog-container": {
            "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "25rem",
                p: "1rem",
            },
        },
    },
    textCenter: {
        textAlign: "center",
    },
    selectField: {
        width: "100%",
        mt: "1rem",
    },
    alert: {
        p: "0 .5rem !important",
        boxSizing: "border-box",
    },
    btn: {
        width: "fit-content",
        p: ".125rem .5rem",
        cursor: "pointer",
    },
    mr1: {
        mr: "1rem",
    },
    loader: {
        width: "1.25rem !important",
        height: "1.25rem !important",
        p: "0 .5rem",
    },
};

const DialogBox = props => {
    const dispatch = useDispatch();
    const { isAddingUser, alert } = useSelector(state => state.user);

    const initialValues = {
        email: "",
        role: "ADMIN",
    };

    const handleFormSubmit = values => {
        dispatch(addUser(values));
    };

    useEffect(() => {
        if (alert.type === "success") {
            setTimeout(() => {
                props.onCloseDialogBox();
            }, 1000);
        }
    }, [alert]);

    return (
        <Grid>
            <Dialog sx={styles.dialogBox} open={props.open}>
                <DialogTitle sx={styles.textCenter}>
                    Send New User Invitation
                </DialogTitle>
                <Formik
                    initialValues={initialValues}
                    validationSchema={inviteUserSchema}
                    onSubmit={handleFormSubmit}
                >
                    {formik => {
                        const {
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        } = formik;
                        return (
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={errors.email}
                                        touched={touched.email}
                                    />
                                    <SelectField
                                        name="role"
                                        value={values.role}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        styles={styles.selectField}
                                        options={props.roles}
                                    />
                                    {alert.type && (
                                        <AlertMessage
                                            severity={alert.type}
                                            message={alert.message}
                                            styles={styles.alert}
                                        />
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <CustomButton
                                        type="button"
                                        variant="outlined"
                                        styles={styles.btn}
                                        onClick={props.onCloseDialogBox}
                                        displayText="Cancel"
                                    />
                                    <CustomButton
                                        type="submit"
                                        variant="outlined"
                                        styles={{
                                            ...styles.btn,
                                            ...styles.mr1,
                                        }}
                                        displayText="Send"
                                        isDisabled={isAddingUser}
                                        icon={
                                            isAddingUser ? (
                                                <CircularProgress
                                                    sx={styles.loader}
                                                />
                                            ) : null
                                        }
                                    />
                                </DialogActions>
                            </form>
                        );
                    }}
                </Formik>
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

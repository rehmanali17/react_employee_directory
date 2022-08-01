import React, { useEffect } from "react";
import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Formik } from "formik";
import { resetPasswordSchema } from "schema/reset_password";
import { useNavigate } from "react-router-dom";
import { signup } from "store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import AlertMessage from "components/Alert";

const styles = {
    container: { display: "flex", height: "100vh" },
    formContainer: { width: "50vw", display: "grid", placeItems: "center" },
    stack: { width: "70%" },
    mb1: {
        mb: "1rem",
    },
    loader: {
        width: "1.25rem !important",
        height: "1.25rem !important",
        mr: "1rem",
    },
    alert: {
        p: "0 .5rem !important",
        boxSizing: "border-box",
    },
    linksContainer: {
        display: "flex",
        gap: ".5rem",
        alignItems: "center",
        marginTop: "1.5rem !important",
    },
    textColor: {
        color: "#272C39",
    },
    textDecoration: {
        textDecoration: "none",
    },
    textPrimary: {
        color: "primary.main",
    },
};

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { requestError, inProgress, user } = useSelector(state => state.auth);

    const initialValues = {
        password: "",
        confirmPassword: "",
    };

    const handleFormSubmit = async values => {
        dispatch(signup(values));
    };

    useEffect(() => {
        if (!location.hash || location.hash.includes("error_code")) {
            navigate("/");
        }
        if (user) {
            navigate("/home");
        }
    }, [user]);

    return (
        <Grid container sx={styles.container}>
            <Grid sx={styles.formContainer}>
                <Stack spacing={1.5} sx={styles.stack}>
                    <Typography variant="h2" component="h6" sx={styles.mb1}>
                        Reset Password
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={resetPasswordSchema}
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
                                    <Stack spacing={1.5}>
                                        <TextInput
                                            label="Password"
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.password}
                                            touched={touched.password}
                                        />
                                        <TextInput
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.confirmPassword}
                                            touched={touched.confirmPassword}
                                        />
                                        <CustomButton
                                            variant="contained"
                                            type="submit"
                                            displayText="Reset Password"
                                            isDisabled={inProgress}
                                            icon={
                                                inProgress ? (
                                                    <CircularProgress
                                                        sx={styles.loader}
                                                    />
                                                ) : null
                                            }
                                        />
                                    </Stack>
                                </form>
                            );
                        }}
                    </Formik>
                    {requestError.isError && (
                        <AlertMessage
                            severity={"error"}
                            message={requestError.message}
                            styles={styles.alert}
                        />
                    )}
                </Stack>
            </Grid>
            <Hero />
        </Grid>
    );
};

export default ResetPassword;

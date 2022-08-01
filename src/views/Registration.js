import React, { useEffect } from "react";
import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { registrationSchema } from "schema/registration";
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

const Regisration = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { requestError, inProgress, user } = useSelector(state => state.auth);

    const initialValues = {
        name: "",
        companyName: "",
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
                        Signup
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={registrationSchema}
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
                                            label="Name"
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.name}
                                            touched={touched.name}
                                            focus={true}
                                        />
                                        <TextInput
                                            label="Company Name"
                                            name="companyName"
                                            type="text"
                                            value={values.companyName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.companyName}
                                            touched={touched.companyName}
                                        />
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
                                            displayText="Signup"
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
                    <Grid sx={styles.linksContainer}>
                        <Typography sx={styles.textColor}>
                            Already have an account?
                        </Typography>
                        <Link to="/" style={styles.textDecoration}>
                            <CustomButton
                                variant="text"
                                styles={styles.textPrimary}
                                displayText="Login"
                            />
                        </Link>
                    </Grid>
                </Stack>
            </Grid>
            <Hero />
        </Grid>
    );
};

export default Regisration;

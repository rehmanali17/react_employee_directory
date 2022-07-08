import React, { useEffect } from "react";
import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { loginSchema } from "schema/login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/authSlice";
import AlertMessage from "components/Alert";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requestError, inProgress, user } = useSelector(state => state.auth);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleFormSubmit = values => {
        dispatch(login(values));
    };

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    return (
        <Grid container sx={{ display: "flex", height: "100vh" }}>
            <Hero />
            <Grid sx={{ width: "50vw", display: "grid", placeItems: "center" }}>
                <Stack spacing={1.5} width="70%">
                    <Typography variant="h2" component="h6" mb="1rem">
                        Login
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
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
                                    <Stack spacing={3}>
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
                                        <CustomButton
                                            variant="contained"
                                            type="submit"
                                            displayText="Login"
                                            isDisabled={inProgress}
                                            icon={
                                                inProgress ? (
                                                    <CircularProgress
                                                        sx={{
                                                            width: "1.25rem !important",
                                                            height: "1.25rem !important",
                                                            mr: "1rem",
                                                        }}
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
                            styles={{
                                p: "0 .5rem !important",
                                boxSizing: "border-box",
                            }}
                        />
                    )}
                    <Grid
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "1.5rem !important",
                        }}
                    >
                        <Grid
                            sx={{
                                display: "flex",
                                gap: ".5rem",
                                alignItems: "center",
                            }}
                        >
                            <Typography sx={{ color: "#272C39" }}>
                                Don&apos;t have an account?
                            </Typography>
                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <CustomButton
                                    variant="text"
                                    styles={{
                                        color: "primary.main",
                                    }}
                                    displayText="Signup"
                                />
                            </Link>
                        </Grid>
                        <Grid>
                            <Link
                                to="recover-password"
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <CustomButton
                                    variant="text"
                                    styles={{
                                        color: "red",
                                    }}
                                    displayText="Forgot password?"
                                />
                            </Link>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Login;

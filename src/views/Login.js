import React from "react";
import { Grid, Typography, Stack, Button } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { loginSchema } from "schema/login";

const Login = () => {
    const initialValues = {
        email: "",
        password: "",
    };

    const handleFormSubmit = values => {
        alert(JSON.stringify(values, null, 2));
    };

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
                                            type="submit"
                                            displayText="Login"
                                        />
                                    </Stack>
                                </form>
                            );
                        }}
                    </Formik>
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
                                <Button
                                    variant="text"
                                    sx={{
                                        color: "primary.main",
                                    }}
                                >
                                    Signup
                                </Button>
                            </Link>
                        </Grid>
                        <Grid>
                            <Link
                                to="recover-password"
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                <Button
                                    variant="text"
                                    sx={{
                                        color: "red",
                                    }}
                                >
                                    Forgot password?
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default Login;
import React from "react";
import { Grid, Typography, Stack, Button } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { passwordRecoverySchema } from "schema/password_recovery";

const PasswordRecovery = () => {
    const initialValues = {
        email: "",
    };

    const handleFormSubmit = values => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <Grid container sx={{ display: "flex", height: "100vh" }}>
            <Hero />
            <Grid sx={{ width: "50vw", display: "grid", placeItems: "center" }}>
                <Stack spacing={2.5} width="70%">
                    <Typography variant="h3" component="h6" mb="1rem">
                        Password Recovery
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={passwordRecoverySchema}
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
                                            errors={errors}
                                            touched={touched}
                                        />
                                        <CustomButton
                                            type="submit"
                                            displayText="Reset My Password"
                                        />
                                    </Stack>
                                </form>
                            );
                        }}
                    </Formik>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Grid
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: "2rem",
                            }}
                        >
                            <Button
                                variant="text"
                                sx={{
                                    color: "primary.main",
                                }}
                            >
                                Back to login
                            </Button>
                        </Grid>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default PasswordRecovery;

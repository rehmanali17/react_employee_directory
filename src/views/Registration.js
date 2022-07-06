import React from "react";
import { Grid, Typography, Stack } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { registrationSchema } from "schema/registration";

const Regisration = () => {
    const initialValues = {
        name: "",
        companyName: "",
        password: "",
        confirmPassword: "",
    };

    const handleFormSubmit = values => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <Grid container sx={{ display: "flex", height: "100vh" }}>
            <Grid sx={{ width: "50vw", display: "grid", placeItems: "center" }}>
                <Stack spacing={1.5} width="70%">
                    <Typography variant="h2" component="h6" mb="1rem">
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
                                    <Stack spacing={3}>
                                        <TextInput
                                            label="Name"
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.name}
                                            touched={touched.name}
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
                                        />
                                    </Stack>
                                </form>
                            );
                        }}
                    </Formik>
                    <Grid
                        sx={{
                            display: "flex",
                            gap: ".5rem",
                            alignItems: "center",
                            marginTop: "1.5rem !important",
                        }}
                    >
                        <Typography sx={{ color: "#272C39" }}>
                            Already have an account?
                        </Typography>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <CustomButton
                                variant="text"
                                styles={{
                                    color: "primary.main",
                                }}
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

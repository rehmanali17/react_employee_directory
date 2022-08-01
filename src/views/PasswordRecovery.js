import React from "react";
import { Grid, Typography, Stack } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { passwordRecoverySchema } from "schema/password_recovery";

const styles = {
    container: { display: "flex", height: "100vh" },
    formContainer: { width: "50vw", display: "grid", placeItems: "center" },
    stack: {
        width: "70%",
    },
    mb1: {
        mb: "1rem",
    },
    textDecoration: { textDecoration: "none" },
    btnContainer: {
        display: "flex",
        justifyContent: "center",
        mt: "2rem",
    },
    textPrimary: {
        color: "primary.main",
    },
};

const PasswordRecovery = () => {
    const initialValues = {
        email: "",
    };

    const handleFormSubmit = values => {
        alert(JSON.stringify(values, null, 2));
    };

    return (
        <Grid container sx={styles.container}>
            <Hero />
            <Grid sx={styles.formContainer}>
                <Stack spacing={2.5} sx={styles.stack}>
                    <Typography variant="h3" component="h6" sx={styles.mb1}>
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
                                    <Stack spacing={1.5}>
                                        <TextInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={errors.email}
                                            touched={touched.email}
                                            focus={true}
                                        />
                                        <CustomButton
                                            type="submit"
                                            variant="contained"
                                            displayText="Reset My Password"
                                        />
                                    </Stack>
                                </form>
                            );
                        }}
                    </Formik>
                    <Link to="/" style={styles.textDecoration}>
                        <Grid sx={styles.btnContainer}>
                            <CustomButton
                                variant="text"
                                styles={styles.textPrimary}
                                displayText="Back to Login"
                            />
                        </Grid>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default PasswordRecovery;

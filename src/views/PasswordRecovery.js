import React, { useState } from "react";
import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { passwordRecoverySchema } from "schema/password_recovery";
import { supabase } from "config/supabase";
import AlertMessage from "components/Alert";

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
  loader: {
    width: "1.25rem !important",
    height: "1.25rem !important",
    mr: "1rem",
  },
  alert: {
    p: "0 .5rem !important",
    boxSizing: "border-box",
  },
};

const PasswordRecovery = () => {
  const [inProgress, setInProgress] = useState(false);
  const [alert, setAlert] = useState({
    isSet: false,
    type: "",
    message: "",
  });
  const initialValues = {
    email: "",
  };

  const handleFormSubmit = async values => {
    setInProgress(true);
    const { error } = await supabase.auth.api.resetPasswordForEmail(
      values.email,
      {
        redirectTo: `${process.env.REACT_APP_URL}/reset-password`,
      }
    );
    setInProgress(false);
    if (error) {
      setAlert({
        isSet: true,
        type: "error",
        message: "Unable to send the email at the moment",
      });
    } else {
      setAlert({
        isSet: true,
        type: "success",
        message: "Reset password email has been sent successfully",
      });
    }
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
            {({ values }) => {
              return (
                <Form>
                  <Stack spacing={1.5}>
                    <TextInput
                      label="Email"
                      name="email"
                      value={values.email}
                      autoFocus={true}
                    />
                    <CustomButton
                      variant="contained"
                      type="submit"
                      displayText="Send Email"
                      isDisabled={inProgress}
                      icon={
                        inProgress ? (
                          <CircularProgress sx={styles.loader} />
                        ) : null
                      }
                    />
                    {alert.isSet && (
                      <AlertMessage
                        severity={alert.type}
                        message={alert.message}
                        styles={styles.alert}
                      />
                    )}
                  </Stack>
                </Form>
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

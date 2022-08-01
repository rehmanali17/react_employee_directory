import React, { useEffect, useRef, useState } from "react";
import {
    Grid,
    Typography,
    Stack,
    CircularProgress,
    Divider,
    Box,
} from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { loginSchema } from "schema/login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/authSlice";
import AlertMessage from "components/Alert";
import EditIcon from "@mui/icons-material/Edit";
import CustomAvatar from "components/Avatar";
import CustomDatePicker from "components/DatePicker";

const styles = {
    container: { display: "flex", height: "100vh" },
};

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [profilePic, setProfilePic] = useState(null);
    const { requestError, inProgress, user } = useSelector(state => state.auth);

    const initialValues = {
        email: "",
        password: "",
    };

    const handleFileInput = () => {
        inputRef.current.click();
    };

    const handleFileChange = event => {
        const file = event.target.files && event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = e => {
            setProfilePic(e.target.result);
        };
        reader.readAsDataURL(file);
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
        <Grid container sx={styles.container}>
            <Grid
                sx={{
                    width: "100vw",
                    display: "grid",
                    justifyItems: "center",
                    m: "3rem 0",
                }}
            >
                <Stack spacing={1} width="50%">
                    <Typography
                        variant="h2"
                        component="h6"
                        sx={{ color: "primary.main", mb: ".5rem" }}
                    >
                        Edit Profile
                    </Typography>
                    <Grid
                        sx={{
                            display: "grid",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <input
                            style={{ display: "none" }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                        <CustomAvatar src={profilePic} size={175} />
                        <Box
                            sx={{
                                bgcolor: "primary.main",
                                width: "fit-content",
                                color: "white",
                                padding: ".5rem",
                                display: "grid",
                                placeItems: "center",
                                borderRadius: "50%",
                                position: "absolute",
                                bottom: "12%",
                                right: "40%",
                                cursor: "pointer",
                            }}
                            component="div"
                            onClick={handleFileInput}
                        >
                            <EditIcon />
                        </Box>
                    </Grid>
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
                                    <Stack spacing={1}>
                                        <Grid>
                                            <Grid mb="1.5rem !important">
                                                <Typography
                                                    variant="h5"
                                                    component="p"
                                                    sx={{
                                                        color: "primary.main",
                                                    }}
                                                >
                                                    Employee Information
                                                </Typography>
                                                <Divider />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Full Name"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                    styles={{ width: "22vw" }}
                                                />
                                                <TextInput
                                                    label="Company"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                    styles={{ width: "22vw" }}
                                                />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Contact Number"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                    styles={{ width: "22vw" }}
                                                />
                                                <TextInput
                                                    label="Address"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                    styles={{ width: "22vw" }}
                                                />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Job Title"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                    styles={{ width: "22vw" }}
                                                />
                                                <CustomDatePicker
                                                    label="Birth Date"
                                                    styles={{ width: "19vw" }}
                                                />
                                                {/* <TextInput
                                                    label="Birth Date"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                    styles={{ width: "22vw" }}
                                                /> */}
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Employement Date"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                    styles={{ width: "22vw" }}
                                                />

                                                <TextInput
                                                    label="Typical Work Hour"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                    styles={{ width: "22vw" }}
                                                />
                                            </Grid>
                                            <TextInput
                                                label="Skills"
                                                name="text"
                                                type="text"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.password}
                                                touched={touched.password}
                                                styles={{ width: "22vw" }}
                                            />
                                            <TextInput
                                                label="Description"
                                                name="text"
                                                type="text"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={errors.password}
                                                touched={touched.password}
                                                styles={{ width: "22vw" }}
                                            />
                                        </Grid>
                                        <Grid>
                                            <Grid mb="1.5rem !important">
                                                <Typography
                                                    variant="h5"
                                                    component="p"
                                                    sx={{
                                                        color: "primary.main",
                                                    }}
                                                >
                                                    Employement History
                                                </Typography>
                                                <Divider />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Company Name"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                    styles={{ width: "22vw" }}
                                                />
                                                <TextInput
                                                    label="Location"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                    styles={{ width: "22vw" }}
                                                />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Job Title"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                    styles={{ width: "22vw" }}
                                                />
                                                <TextInput
                                                    label="Job Description"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                    styles={{ width: "22vw" }}
                                                />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Start Date"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                    styles={{ width: "22vw" }}
                                                />
                                                <TextInput
                                                    label="End Date"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                    styles={{ width: "22vw" }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Grid mb="1.5rem !important">
                                                <Typography
                                                    variant="h5"
                                                    component="p"
                                                    sx={{
                                                        color: "primary.main",
                                                    }}
                                                >
                                                    Qualification
                                                </Typography>
                                                <Divider />
                                            </Grid>
                                            <Grid
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <TextInput
                                                    label="Institue"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                />
                                                <TextInput
                                                    label="Score"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                />
                                                <TextInput
                                                    label="Start"
                                                    name="text"
                                                    type="name"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                    touched={touched.email}
                                                    focus={true}
                                                />
                                                <TextInput
                                                    label="End"
                                                    name="text"
                                                    type="text"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                    touched={touched.password}
                                                />
                                            </Grid>
                                        </Grid>
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

export default EditProfile;

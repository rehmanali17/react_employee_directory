import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
// import { Link } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import { employeeProfileSchema } from "schema/employee_profile";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/authSlice";
import AlertMessage from "components/Alert";
import EditIcon from "@mui/icons-material/Edit";
import CustomAvatar from "components/Avatar";
import CustomDatePicker from "components/DatePicker";
import CustomTimePicker from "components/TimePicker";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const styles = {
  container: { display: "flex", height: "100vh" },
};

const EditProfile = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const inputRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);
  const { requestError, inProgress, user } = useSelector(state => state.auth);

  const initialValues = {
    employee_information: {
      name: "",
      companyName: "",
      contactNumber: "",
      address: "",
      jobTitle: "",
      birthDate: new Date(),
      employementDate: new Date(),
      workHour: "",
      skills: "",
      description: "",
    },
    employee_history: [
      {
        companyName: "",
        location: "",
        jobTitle: "",
        jobDescription: "",
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
    qualification: [
      {
        instituteName: "",
        score: "",
      },
    ],
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
    // if (user) {
    //     navigate("/home");
    // }
    console.log(user);
  }, [user]);

  return (
    <Grid container sx={styles.container}>
      <Grid
        sx={{
          width: "100vw",
          display: "grid",
          justifyItems: "center",
          margin: "3rem 0",
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
            validationSchema={employeeProfileSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
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
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          label="Full Name"
                          name="employee_information.name"
                          value={values.employee_information.name}
                          autoFocus={true}
                          styles={{
                            width: "22vw",
                          }}
                        />
                        <TextInput
                          label="Company"
                          name="employee_information.companyName"
                          value={values.employee_information.companyName}
                          styles={{
                            width: "22vw",
                          }}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          label="Contact Number"
                          name="employee_information.contactNumber"
                          type="text"
                          value={values.employee_information.contactNumber}
                          styles={{
                            width: "22vw",
                          }}
                        />
                        <TextInput
                          label="Address"
                          name="employee_information.address"
                          type="text"
                          value={values.employee_information.address}
                          styles={{
                            width: "22vw",
                          }}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          label="Job Title"
                          name="employee_information.jobTitle"
                          type="text"
                          value={values.employee_information.jobTitle}
                          styles={{
                            width: "22vw",
                          }}
                        />
                        <CustomDatePicker
                          label="Birth Date"
                          value={values.employee_information.birthDate}
                          onChange={value => {
                            setFieldValue(
                              "employee_information.birthDate",
                              value
                            );
                          }}
                          styles={{
                            width: "19vw",
                          }}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: "1rem",
                        }}
                      >
                        <CustomDatePicker
                          label="Employement Date"
                          value={values.employee_information.employementDate}
                          onChange={value => {
                            setFieldValue(
                              "employee_information.employementDate",
                              value
                            );
                          }}
                          styles={{
                            width: "19vw",
                          }}
                        />
                        <CustomTimePicker
                          label="Typical Work Hour"
                          name="employee_information.workHour"
                          value={values.employee_information.workHour}
                          onChange={value => {
                            setFieldValue(
                              "employee_information.workHour",
                              value
                            );
                          }}
                          styles={{
                            width: "19vw",
                          }}
                        />
                      </Grid>
                      <TextInput
                        label="Skills"
                        name="employee_information.skills"
                        type="text"
                        value={values.employee_information.skills}
                        styles={{
                          width: "22vw",
                        }}
                      />
                      <TextInput
                        label="Description"
                        name="employee_information.description"
                        type="text"
                        value={values.employee_information.description}
                        styles={{
                          width: "22vw",
                        }}
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
                      <FieldArray
                        name="employee_history"
                        render={arrayHelpers => {
                          {
                            {
                              return values.employee_history.map(
                                (value, index) => {
                                  return (
                                    <>
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                        }}
                                        key={index}
                                      >
                                        <TextInput
                                          label="Company Name"
                                          name={`employee_history[${index}].companyName`}
                                          value={value.companyName}
                                          styles={{
                                            width: "22vw",
                                          }}
                                        />
                                        <TextInput
                                          label="Location"
                                          name={`employee_history[${index}].location`}
                                          value={value.location}
                                          styles={{
                                            width: "22vw",
                                          }}
                                        />
                                      </Grid>
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <TextInput
                                          label="Job Title"
                                          name={`employee_history[${index}].jobTitle`}
                                          value={value.jobTitle}
                                          styles={{
                                            width: "22vw",
                                          }}
                                        />
                                        <TextInput
                                          label="Job Description"
                                          name={`employee_history[${index}].jobDescription`}
                                          value={value.jobDescription}
                                          styles={{
                                            width: "22vw",
                                          }}
                                        />
                                      </Grid>
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          mb: "1rem",
                                        }}
                                      >
                                        <CustomDatePicker
                                          label="Start Date"
                                          value={value.startDate}
                                          onChange={value => {
                                            setFieldValue(
                                              `employee_history[${index}].startDate`,
                                              value
                                            );
                                          }}
                                          styles={{
                                            width: "19vw",
                                          }}
                                        />
                                        <CustomDatePicker
                                          label="End Date"
                                          value={value.endDate}
                                          onChange={value => {
                                            setFieldValue(
                                              `employee_history[${index}].endDate`,
                                              value
                                            );
                                          }}
                                          styles={{
                                            width: "19vw",
                                          }}
                                        />
                                      </Grid>
                                      <Grid
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          position: "relative",
                                          top: "-.75rem",
                                        }}
                                      >
                                        {values.employee_history.length > 1 && (
                                          <IconButton
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={styles.iconBtn}
                                            onClick={() => {
                                              arrayHelpers.remove(index);
                                            }}
                                          >
                                            <RemoveCircleIcon
                                              sx={{
                                                fontSize: "2.5rem",
                                                color: "primary.main",
                                              }}
                                            />
                                          </IconButton>
                                        )}
                                        <IconButton
                                          size="large"
                                          edge="start"
                                          color="inherit"
                                          aria-label="menu"
                                          sx={{
                                            ...styles.iconBtn,
                                            justifySelf: "end",
                                          }}
                                          onClick={() =>
                                            arrayHelpers.insert(index, {
                                              companyName: "",
                                              location: "",
                                              jobTitle: "",
                                              jobDescription: "",
                                              startDate: "",
                                              endDate: "",
                                            })
                                          }
                                        >
                                          <AddCircleIcon
                                            sx={{
                                              fontSize: "2.5rem",
                                              color: "primary.main",
                                            }}
                                          />
                                        </IconButton>
                                      </Grid>
                                      <Divider
                                        sx={{
                                          position: "relative",
                                          top: "-.5rem",
                                        }}
                                      />
                                    </>
                                  );
                                }
                              );
                            }
                          }
                        }}
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
                          Qualification
                        </Typography>
                        <Divider />
                      </Grid>
                      <FieldArray
                        name="qualification"
                        render={arrayHelpers => {
                          {
                            return values.qualification.map((value, index) => {
                              return (
                                <Grid
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                  }}
                                  key={index}
                                >
                                  <TextInput
                                    label="Institute"
                                    name={`qualification[${index}].instituteName`}
                                    value={value.instituteName}
                                    styles={{
                                      width: "19vw",
                                    }}
                                  />
                                  <TextInput
                                    label="Score"
                                    name={`qualification[${index}].score`}
                                    value={value.score}
                                    styles={{
                                      width: "19vw",
                                    }}
                                  />
                                  {values.qualification.length > 1 && (
                                    <IconButton
                                      size="large"
                                      edge="start"
                                      color="inherit"
                                      aria-label="menu"
                                      sx={styles.iconBtn}
                                      onClick={() => {
                                        arrayHelpers.remove(index);
                                      }}
                                    >
                                      <RemoveCircleIcon
                                        sx={{
                                          fontSize: "2.5rem",
                                          color: "primary.main",
                                        }}
                                      />
                                    </IconButton>
                                  )}
                                  <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{
                                      ...styles.iconBtn,
                                      justifySelf: "end",
                                    }}
                                    onClick={() =>
                                      arrayHelpers.insert(index, {
                                        instituteName: "",
                                        score: "",
                                      })
                                    }
                                  >
                                    <AddCircleIcon
                                      sx={{
                                        fontSize: "2.5rem",
                                        color: "primary.main",
                                      }}
                                    />
                                  </IconButton>
                                </Grid>
                              );
                            });
                          }
                        }}
                      />
                    </Grid>
                    <CustomButton
                      variant="contained"
                      type="submit"
                      displayText="Update Profile"
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
                </Form>
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
        </Stack>
      </Grid>
    </Grid>
  );
};

export default EditProfile;

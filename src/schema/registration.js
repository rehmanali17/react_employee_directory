import { object, string, ref } from "yup";

export const registrationSchema = object({
    name: string()
        .required("Name is required")
        .matches(/^[a-zA-z ]+$/, "Please enter a valid name"),
    companyName: string().required("Company Name is required"),
    password: string()
        .required("Password is required")
        .min(6, "Password should be atleast 6 characters"),
    confirmPassword: string()
        .required("Confirm Password is required")
        .oneOf([ref("password")], "Passwords don't match"),
});

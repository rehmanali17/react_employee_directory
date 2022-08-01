import { object, string, ref } from "yup";

export const resetPasswordSchema = object({
    password: string()
        .required("Password is required")
        .min(6, "Password should be atleast 6 characters"),
    confirmPassword: string()
        .required("Confirm Password is required")
        .oneOf([ref("password")], "Passwords don't match"),
});

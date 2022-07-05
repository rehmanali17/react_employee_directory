import { object, string } from "yup";

export const passwordRecoverySchema = object({
    email: string()
        .required("Email is required")
        .email("Please enter a valid email"),
});

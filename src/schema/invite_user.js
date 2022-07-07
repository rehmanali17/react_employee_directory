import { object, string } from "yup";

export const inviteUserSchema = object({
    email: string()
        .required("Email is required")
        .email("Please enter a valid email"),
    role: string().required("Role is required"),
});

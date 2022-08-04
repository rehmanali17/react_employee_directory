import { date, object, string, array } from "yup";

export const employeeProfileSchema = object({
    employee_information: object({
        name: string()
            .required("Name is required")
            .matches(/^[a-zA-z ]+$/, "Please enter a valid name"),
        companyName: string().required("Company Name is required"),
        contactNumber: string()
            .required("Contact number is required")
            .matches(/^[0-9]{11}$/, "Enter a valid 11 digit contact number"),
        address: string().required("Address is required"),
        jobTitle: string().required("Job title is required"),
        birthDate: date().required("Birth date is required"),
        employementDate: date().required("Employment date is required"),
        workHour: date().required("Work hour is required"),
        skills: string().required("Skills are required"),
        description: string().required("Description is required"),
    }),
    employee_history: array().of(
        object({
            companyName: string().required("Company Name is required"),
            location: string().required("Company Location is required"),
            jobTitle: string().required("Job title is required"),
            jobDescription: string().required("Job description is required"),
            startDate: date().required("Employement Start date is required"),
            endDate: date().required("Employment End date is required"),
        })
    ),
    qualification: array().of(
        object({
            instituteName: string().required("Institute Name is required"),
            score: string().required("Score is required"),
        })
    ),
});

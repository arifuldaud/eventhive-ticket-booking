
import { z } from "zod";

// Signup Validation
export const signupValidationSchema = z.object({
    name: z.string({
        error: "Name is required"
    }).min(1, "Name is required"),

    email: z.email({
        error: "Invalid email address"
    }),

    password: z.string({
        error: "Password is required"
    }).min(1, "Password is required"),

    role: z.enum(["attendee", "organizer"])
        .optional()
        .default("attendee")
});

// Login Validation
export const loginValidationSchema = z.object({
    email: z.email({
        error: "Invalid email address"
    }),

    password: z.string({
        error: "Password is required"
    }).min(1, "Password is required")
});

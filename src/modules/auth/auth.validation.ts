import { z } from "zod";

export const signupValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),

    email: z.email({
        error: "Invalid email address"
    }),

    password: z.string().min(1, "Password is required"),

    role: z.enum(["attendee", "organizer"])
        .optional()
        .default("attendee")
});
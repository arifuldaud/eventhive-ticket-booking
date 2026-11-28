import { z } from "zod";

export const eventValidationSchema = z.object({
    title: z.string({
        error: "Title is required"
    }).min(1, "Title is required"),

    description: z.string({
        error: "Description is required"
    }).min(1, "Description is required"),

    category: z.string({
        error: "Category is required"
    }).min(1, "Category is required"),

       date: z.iso.datetime({
        error: "Invalid date"
    }).transform((value) => new Date(value)),

    location: z.string({
        error: "Location is required"
    }).min(1, "Location is required"),

    total_seats: z.number()
        .int("Total seats must be an integer")
        .positive("Total seats must be greater than zero"),

    price: z.number()
        .nonnegative("Price cannot be negative")
});
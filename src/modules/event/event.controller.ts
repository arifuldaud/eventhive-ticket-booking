import { RequestHandler } from "express";
import { eventValidationSchema } from "./event.validation";
import { eventService } from "./event.service";
import AppError from "../../utils/AppError";

const createEvent: RequestHandler = async (req, res, next) => {
    try {
        // 1. Validate request body using Zod
        const validation = eventValidationSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: validation.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }

        // 2. Get organizer ID from JWT
        const organizerId = req.user?.id;

        if (!organizerId) {
            throw new AppError("Unauthorized", 401);
        }

        // 3. Call Event Service
        const result = await eventService.createEvent(
            validation.data,
            organizerId
        );

        // 4. Send success response
        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: result
        });

    } catch (error: unknown) {
        return next(error);
    }
};

export const eventController = {
    createEvent
};
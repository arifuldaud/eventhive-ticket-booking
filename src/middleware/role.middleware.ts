import { RequestHandler } from "express";
import AppError from "../utils/AppError";

const authorizedRoles = (...roles: ("attendee" | "organizer")[]) => {
    const middleware: RequestHandler = (req, res, next) => {
        if (!req.user) {
            return next(new AppError("Unauthorized", 401));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError("Forbidden", 403));
        }

        next();
    };

    return middleware;
};

export default authorizedRoles;
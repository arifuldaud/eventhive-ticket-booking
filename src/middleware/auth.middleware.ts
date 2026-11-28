
import { RequestHandler } from "express";
import { jwtHeplers } from "../utils/jwtHelpers";
import AppError from "../utils/AppError";

const verifyToken: RequestHandler = (req, res, next) => {
    try {
        // Step 1: Get Authorization Header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("Unauthorized", 401);
        }


        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            throw new AppError("Unauthorized", 401);
        }

      
        const decoded = jwtHeplers.verifyToken(token);

      
        if (
            typeof decoded !== "object" ||
            decoded === null ||
            typeof decoded.id !== "number" ||
            !["attendee", "organizer"].includes(decoded.role as string)
        ) {
            throw new AppError("Invalid Token", 401);
        }

     
        req.user = {
            id: decoded.id,
            role: decoded.role as "attendee" | "organizer"
        };

  
        next();

    } catch (error) {
        if (error instanceof AppError) {
            return next(error);
        }

        return next(new AppError("Invalid or Expired Token", 401));
    }
};


export const authmiddleware= { 
    verifyToken,

}

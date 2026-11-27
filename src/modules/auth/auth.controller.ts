import { RequestHandler } from "express";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { pool } from "../../config/db";
import { authservice } from "./auth.service";
import AppError from "../../utils/AppError";
import { signupValidationSchema } from "./auth.validation";

const signup:RequestHandler = async(req,res,next) =>{

try {
    
    const validation =signupValidationSchema.safeParse(req.body);

    if(!validation.success) {
        throw new AppError("Validation Error", 400);
    }



    const { name, email, password, role = "attendee" } = req.body;

 const result = await authservice.signup(req.body);

    res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  
});

} catch (error: unknown) {
    next(error);
};
}

export const authcontroller = {
    signup,
};
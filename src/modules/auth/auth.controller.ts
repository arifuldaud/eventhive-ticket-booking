import { RequestHandler } from "express";
import { passwordHelpers } from "../../utils/passwordHelpers";
import { pool } from "../../config/db";
import { authservice } from "./auth.service";
import AppError from "../../utils/AppError";
import { loginValidationSchema, signupValidationSchema } from "./auth.validation";
import { resolve } from "dns";
import { email } from 'zod';

const signup:RequestHandler = async(req,res,next) =>{

try {
    
   const validation = signupValidationSchema.safeParse(req.body);

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

const result = await authservice.signup(validation.data);

    res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  
});

} catch (error: unknown) {
    next(error);
};
}

const login:RequestHandler =async(req,res,next) =>{
try {

  
const validation = loginValidationSchema.safeParse(req.body);
 
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

const { email, password } = validation.data;
  const {user,token} = await authservice.login(email,password);
  
    res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
},
  
});

} catch (error: unknown) {
    next(error);
};
}


export const authcontroller = {
    signup,login,
};
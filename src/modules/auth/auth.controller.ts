import { RequestHandler } from "express";

import { passwordHelpers } from "../../utils/passwordHelpers";
import { pool } from "../../config/db";

const signup:RequestHandler = async(req,res,next) =>{

try {
    const { name, email, password, role = "attendee" } = req.body;

 const hashedPassword = await passwordHelpers.hashPassword(password);

const result = await pool.query(
    `INSERT INTO users (name, email, password, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, hashedPassword, role]
);

    res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email,
        role: result.rows[0].role,
        created_at: result.rows[0].created_at,
        updated_at: result.rows[0].updated_at
    }
  
});

} catch (error: unknown) {
    next(error);
};
}

export const authcontroller = {
    signup,
};
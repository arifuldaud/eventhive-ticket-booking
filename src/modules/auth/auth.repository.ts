
import { pool } from "../../config/db";
import { IUser } from "./auth.interface";

const createUser = async (payload: IUser) => {
    const { name, email, password, role } = payload;

    const result = await pool.query(
        `INSERT INTO users (name, email, password, role)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, role, created_at, updated_at`,
        [name, email, password, role]
    );

    return result.rows[0];
};

const findUserByEmail = async (email: string) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    return result.rows[0];
};

export const authRepository = {
    createUser,
    findUserByEmail,
};

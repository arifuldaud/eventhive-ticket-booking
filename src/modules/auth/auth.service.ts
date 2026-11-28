
import { passwordHelpers } from "../../utils/passwordHelpers";
import { authRepository } from "./auth.repository";
import { IUser } from "./auth.interface";
import AppError from "../../utils/AppError";
import { email } from "zod";
import { pool } from "../../config/db";
import { jwtHeplers } from '../../utils/jwtHelpers';
import { userInfo } from "node:os";

const signup = async (payload: IUser) => {

    const { name, email, password, role } = payload;

  
    const existingUser = await authRepository.findUserByEmail(email);

   if (existingUser) {
   throw new AppError("Email already registered", 409);
   }
    const hashedPassword = await passwordHelpers.hashPassword(password);

 
    const user = await authRepository.createUser({
        name,
        email,
        password: hashedPassword,
        role
    });

    return user;
};

const login = async (email: string, password: string) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordMatched = await passwordHelpers.compareHash(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new AppError("Invalid email or password", 401);
    }

  const token =jwtHeplers.generateToken(
    {
    id: user.id,
    role: user.role
    });

return {
    token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
};

};



export const authservice = {
    signup,login}
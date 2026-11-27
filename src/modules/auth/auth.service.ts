
import { passwordHelpers } from "../../utils/passwordHelpers";
import { authRepository } from "./auth.repository";
import { IUser } from "./auth.interface";
import AppError from "../../utils/AppError";

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

export const authservice = {
    signup,}
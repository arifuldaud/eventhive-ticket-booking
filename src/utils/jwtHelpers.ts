import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/env";

const generateToken = (payload: JwtPayload) => {
    return jwt.sign(
        payload,
        config.jwt_secret as string,
        {
            expiresIn: config.jwt_expires_in as string
        }
    );
};

const verifyToken =(token:string) => {
    return jwt.verify(token,config.jwt_secret as string);

};


export const jwtHeplers ={
    generateToken,verifyToken, generateInvalidRoleToken,
    generateInvalidIdToken
};
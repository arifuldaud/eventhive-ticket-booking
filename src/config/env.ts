

import path from "path";
import dotenv from "dotenv";
dotenv.config({path:path.join(process.cwd(),".env")})

const config = {
    port:process.env.PORT,
    nodeEnv : process.env.NODE_ENV,
    connection_string: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in:process.env.JWT_EXPIRES_IN,
};

export default config;
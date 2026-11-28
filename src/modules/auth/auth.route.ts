import { Router } from "express";
import { authcontroller } from "./auth.controller";


const authRouter = Router()


authRouter.post("/signup",authcontroller.signup);

authRouter.post("/login",authcontroller.login);


export default authRouter;
import { Router } from "express";
import { authcontroller } from "./auth.controller";


const authRouter = Router()


authRouter.post("/signup",authcontroller.signup);

export default authRouter;
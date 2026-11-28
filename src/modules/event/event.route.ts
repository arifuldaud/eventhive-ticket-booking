import { Router } from "express";
import { authmiddleware } from "../../middleware/auth.middleware";
import authorizedRoles from "../../middleware/role.middleware";
import { eventController } from "./event.controller";



const eventRouter = Router()

eventRouter.post("/",authmiddleware.verifyToken,
authorizedRoles("organizer"),eventController.createEvent);


export default eventRouter;
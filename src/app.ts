import express from "express";

import cors from "cors";
import authRouter from "./modules/auth/auth.route";
import errorMiddleware from "./middleware/error.middleware";
import { authmiddleware } from "./middleware/auth.middleware";
import eventRouter from "./modules/event/event.route";

const app = express();
app.use(cors({
  origin: "http://localhost:5000"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to EventHive API",
  });
});

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/events",eventRouter);


// Temporarry 
app.get(
    "/api/v1/test-protected",
    authmiddleware.verifyToken,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Authentication successful",
            user: req.user
        });
    }
);


app.use(errorMiddleware);
export default app;
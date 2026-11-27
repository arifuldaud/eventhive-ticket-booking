import express from "express";

import cors from "cors";
import authRouter from "./modules/auth/auth.route";
import errorMiddleware from "./middleware/error.middleware";


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

app.use(errorMiddleware);
export default app;
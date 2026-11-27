import express from "express";

import cors from "cors";

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to EventHive API",
  });
});




export default app;
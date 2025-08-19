import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/connect.js";
import authRouter from "./routes/authRoute.js";
import todoRouter from "./routes/todoRoute.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//API Endpoint
app.get("/", (req, res) => res.send("API Working"));

app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));

// src/app.ts
import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection";
import userRouter from "./router/userRouter";
import { errorMiddleware } from "./middlewares/error";

dotenv.config();

const app: Application = express();

// ------------------ Middleware ------------------ //
app.use(cors({ 
  origin: process.env.FRONTEND_URL as string, 
  credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload({ 
  useTempFiles: true, 
  tempFileDir: "/tmp/",  // updated to /tmp (common folder)
}));

// ------------------ Database Connection ------------------ //
dbConnection();

// ------------------ Routes ------------------ //
// userRouter no longer has token policy
app.use("/api/users", userRouter);

// ------------------ Error Middleware ------------------ //
app.use(errorMiddleware);

// ------------------ Export App ------------------ //
export default app;

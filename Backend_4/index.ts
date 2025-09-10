// Backend_4/index.ts
import express, { Request, Response } from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";

// If your current app is in app.ts, import it
// import app from "./app"; 

const app = express();
app.use(express.json());

// Example route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running 🚀");
});

// Export handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req as any, res as any);
};

import express, { Request, Response } from "express";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running 🚀");
});

// Export the handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => app(req as any, res as any);

import { Response } from "express";
import { IUserDocument } from "../models/userSchema";

// Send response without JWT
export const generateToken = (
  user: IUserDocument,
  message: string,
  statusCode: number,
  res: Response
) => {
  res.status(statusCode).json({
    success: true,
    message,
    user,
  });
};

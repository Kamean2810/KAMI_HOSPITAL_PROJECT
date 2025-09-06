import { Request, Response, NextFunction } from "express";

// Fix interface to correctly extend Error
class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ErrorHandler.prototype);

    // Ensure name is a string
    this.name = "ErrorHandler";
  }
}

// Middleware to handle errors
export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500; // default 500
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default ErrorHandler;

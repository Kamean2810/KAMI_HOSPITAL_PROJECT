// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/userSchema";
import { catchAsyncErrors } from "./catchAsyncErrors";
import ErrorHandler from "./error";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Request to include user
interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

// Generic Token Verification Middleware
export const verifyToken = (cookieName: string) =>
  catchAsyncErrors(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.[cookieName];
    if (!token) {
      return next(new ErrorHandler("Authentication token missing", 401));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
      const user = await User.findById(decoded.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      req.user = user;
      next();
    } catch (err) {
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  });

// Role-based Authorization Middleware
export const isAuthorized = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user?.role || "User"} not allowed to access this resource!`, 403));
    }
    next();
  };
};

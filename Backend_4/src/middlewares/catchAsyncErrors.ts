import { Request, Response, NextFunction } from "express";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const catchAsyncErrors = (theFunction: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};

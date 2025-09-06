import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { Message, IMessage } from "../models/messageSchema";
import ErrorHandler from "../middlewares/error";

// Send a new message
export const sendMessage = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phone, message } = req.body as Partial<IMessage>;

    if (!firstName || !lastName || !email || !phone || !message) {
      return next(new ErrorHandler("Please Fill Full Form!..", 400));
    }

    await Message.create({ firstName, lastName, email, phone, message });

    res.status(200).json({
      success: true,
      message: "Message Sent Successfully!..",
    });
  }
);

// Get all messages
export const getAllMessages = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const messages: IMessage[] = await Message.find();

    res.status(200).json({
      success: true,
      messages,
    });
  }
);

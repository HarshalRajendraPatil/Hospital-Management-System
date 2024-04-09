import { Message } from "../models/messageSchema.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorMiddleware.js";

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, message, email, phone } = req.body;
  if (!firstName || !lastName || !message || !email || !phone) {
    return next(new ErrorHandler("Please fill out the full form."), 400);
  }
  await Message.create({ firstName, lastName, message, email, phone });
  res.status(200).json({
    success: true,
    message: "Message sent successfully.",
  });
});

export const getAllMessages = catchAsyncError(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});

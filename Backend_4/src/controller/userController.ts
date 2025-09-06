import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../middlewares/error";
import { User, IUserDocument } from "../models/userSchema";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

// Custom request type for file uploads
interface FileRequest extends Request {
  files?: {
    [fieldname: string]: fileUpload.UploadedFile | fileUpload.UploadedFile[];
  };
}

interface UploadedFileCustom {
  name: string;
  mv: (path: string) => Promise<void>;
  mimetype: string;
  tempFilePath: string;
  size: number;
}

// ------------------ Helper: Convert DOB ------------------
const convertDob = (dob: string): Date => {
  if (!dob.includes("/")) return new Date(dob); // already ISO format
  const [day, month, year] = dob.split("/");
  return new Date(`${year}-${month}-${day}`);
};

// ------------------ PATIENT REGISTER ------------------
export const patientRegister = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password)
      return next(new ErrorHandler("Please Fill Full Form!", 400));

    const isRegistered = await User.findOne({ email });
    if (isRegistered)
      return next(new ErrorHandler("User already Registered!", 400));

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob: convertDob(dob),
      gender,
      password,
      role: "Patient",
    });

    res.status(201).json({
      success: true,
      message: "Patient Registered Successfully",
      user,
    });
  }
);

// ------------------ LOGIN ------------------
export const login = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role)
      return next(new ErrorHandler("Provide All Details First!..", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("User Not Found!...", 400));

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) return next(new ErrorHandler("Incorrect Password!...", 400));

    if (role !== user.role)
      return next(new ErrorHandler("User Of This Role Not Found!..", 400));

    res.status(200).json({
      success: true,
      message: "Login Successful",
      user,
    });
  }
);

// ------------------ LOGOUT ------------------
export const logoutAdmin = catchAsyncErrors(async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Admin Logged Out Successfully" });
});

export const logoutPatient = catchAsyncErrors(async (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Patient Logged Out Successfully" });
});

// ------------------ ADD NEW DOCTOR ------------------
export const addNewDoctor = catchAsyncErrors(
  async (req: FileRequest, res: Response, next: NextFunction) => {
    if (!req.files || !req.files.docAvatar)
      return next(new ErrorHandler("Doctor Avatar Is Required!...", 400));

    const docAvatar = req.files.docAvatar as UploadedFileCustom;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype))
      return next(new ErrorHandler("Format Does Not Supported!..", 400));

    const { firstName, lastName, email, phone, nic, dob, gender, password, doctorDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !doctorDepartment)
      return next(new ErrorHandler("Provide Full Details First!...", 400));

    const isRegistered = await User.findOne({ email });
    if (isRegistered)
      return next(new ErrorHandler(`${isRegistered.role} already Exists With This Email`, 400));

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);

    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob: convertDob(dob),
      gender,
      password,
      doctorDepartment,
      role: "Doctor",
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  }
);

// ------------------ GET USER DETAILS ------------------
export const getUserDetails = catchAsyncErrors(
  async (req: Request & { user?: IUserDocument }, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ErrorHandler("User not Found!...", 404));
    res.status(200).json({ success: true, user: req.user });
  }
);

// ------------------ GET ALL DOCTORS ------------------
export const getAllDoctors = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({ success: true, doctors });
  }
);

// ------------------ ADD NEW ADMIN ------------------
export const addNewAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password)
      return next(new ErrorHandler("Provide Full Details First!...", 400));

    const isRegistered = await User.findOne({ email });
    if (isRegistered)
      return next(new ErrorHandler(`${isRegistered.role} already Exists With This Email`, 400));

    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob: convertDob(dob),
      gender,
      password,
      role: "Admin",
    });

    res.status(200).json({ success: true, message: "Admin Registered", admin });
  }
);

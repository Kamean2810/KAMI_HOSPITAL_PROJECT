import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../middlewares/error";
import { Appointment, IAppointment } from "../models/appointmentSchema";
import { User, IUser } from "../models/userSchema";
import { Types, Document } from "mongoose";

// Extend Appointment with Mongoose Document
type IAppointmentDocument = IAppointment & Document;

// Create a new appointment
export const postAppointment = catchAsyncErrors(
  async (
    req: Request & { user?: IUser },
    res: Response,
    next: NextFunction
  ) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      hasVisited,
      address,
    } = req.body as Partial<IAppointment> & {
      doctor_firstName: string;
      doctor_lastName: string;
    };

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !address
    ) {
      return next(new ErrorHandler("Fill Full Form First!..", 400));
    }

    const doctors: IUser[] = await User.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    });

    if (doctors.length === 0) {
      return next(
        new ErrorHandler("Doctor With These Credentials not found!!..", 404)
      );
    }

    if (doctors.length > 1) {
      return next(
        new ErrorHandler(
          "Multiple doctors found! Contact through Email",
          404
        )
      );
    }

    // Cast IDs to Types.ObjectId
    const doctorId: Types.ObjectId = doctors[0]._id as Types.ObjectId;
    const patientId: Types.ObjectId = req.user?._id as Types.ObjectId;

    const appointment: IAppointmentDocument = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });

    res.status(200).json({
      success: true,
      message: "Appointment Sent!!..",
      appointment,
    });
  }
);

// Get all appointments
export const getAllAppointments = catchAsyncErrors(
  async (req: Request, res: Response) => {
    const appointments: IAppointmentDocument[] = await Appointment.find();
    res.status(200).json({
      success: true,
      appointments,
    });
  }
);

// Update appointment status
export const updateAppointmentStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let appointment: IAppointmentDocument | null = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }) as IAppointmentDocument; // assert type

    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
      appointment,
    });
  }
);

// Delete appointment
// Delete appointment
export const deleteAppointment = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    // Use findByIdAndDelete instead of document.remove()
    const appointment: IAppointmentDocument | null = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found!", 404));
    }

    res.status(200).json({
      success: true,
      message: "Appointment Deleted!",
    });
  }
);

import { catchAsyncError } from "./../middleware/catchAsyncError.js";
import ErrorHandler from "./../middleware/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "./../models/userSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
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
  } = req.body;

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
    return next(new ErrorHandler("Please provide all the details!", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("No Doctor found!", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctor conflict! Please contact through email or phone",
        404
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
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
    message: "Appointment Sent Successfully.",
  });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!appointment) {
      return next(new ErrorHandler("No Appointment Found!", 404));
    }
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated",
      appointment,
    });
  }
);

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findByIdAndDelete(id);
  if (!appointment) {
    return next(new ErrorHandler("No Appointment Found!", 404));
  }
  res.status(200).json({
    success: true,
    message: "Appointment Deleted Successfully",
  });
});

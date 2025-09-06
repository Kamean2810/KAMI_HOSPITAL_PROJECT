import express, { Router } from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController";

const router: Router = express.Router();

// Routes without token/auth middlewares
router.post("/post", postAppointment);
router.get("/getall", getAllAppointments);
router.put("/update/:id", updateAppointmentStatus);
router.delete("/delete/:id", deleteAppointment);

export default router;

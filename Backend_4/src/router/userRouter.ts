import { Router } from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controller/userController";

const router: Router = Router();

// ------------------ Patient Routes ------------------ //
// Public registration route
router.post("/patient/register", patientRegister);

// No token/auth required
router.get("/patient/me", getUserDetails);
router.get("/patient/logout", logoutPatient);

// ------------------ Admin Routes ------------------ //
// Admin actions without token check
router.post("/admin/addnew", addNewAdmin);
router.get("/admin/me", getUserDetails);
router.get("/admin/logout", logoutAdmin);

// ------------------ Doctor Routes ------------------ //
// Admin can add doctor (now open without token)
router.post("/doctor/addnew", addNewDoctor);

// Public route to get all doctors
router.get("/doctors", getAllDoctors);

// ------------------ Auth Routes ------------------ //
// Login route (public)
router.post("/login", login);

export default router;

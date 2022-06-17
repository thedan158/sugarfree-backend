import express from "express";
const router = express.Router();

import { DoctorController } from "../controllers/doctor.controller.js";

router.get("/getPatientMessages/:username", DoctorController.getPatientMessages);


export default router;
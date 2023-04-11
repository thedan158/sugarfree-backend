import express from "express";
const router = express.Router();

import { ReportController } from "../controllers/report.controller.js";

router.post("/saveSugarlvl", ReportController.saveTodaySugarLevel);
router.post("/saveBMI", ReportController.saveTodayBMI);
router.post("/getTodayReport", ReportController.getTodayReport);
router.post("/getAllReport", ReportController.getAllReport);
router.post(
  "/createPrescription/:username",
  ReportController.createPrescription
);
router.post(
  "/createService/:username",
  ReportController.createService
);
router.get(
  "/getAllPrescription/:username",
  ReportController.getAllPrescription
);
router.get(
  "/getAllService",
  ReportController.getAllServiceFromEveryUser
);
router.get('/getAllService/:username', ReportController.getAllService)
export default router;

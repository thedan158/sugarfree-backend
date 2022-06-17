import express from "express";
const router = express.Router();

import { ReportController } from "../controllers/report.controller.js";

router.post("/saveSugarlvl", ReportController.saveTodaySugarLevel);
router.post("/saveBMI", ReportController.saveTodayBMI);
router.post("/getTodayReport", ReportController.getTodayReport);
router.post("/getAllReport", ReportController.getAllReport);


export default router;

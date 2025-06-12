import express from "express";
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  getMyReports,
} from "../controllers/reportController.js";
import { protect } from "../middlewares/protect.js";

const router = express.Router();

// 📌 Create a new report — PROTECT THIS!
router.post("/", protect, createReport);

// 📌 Get all reports
router.get("/", getAllReports);

// 📌 Get only logged-in user's reports — this should be ABOVE :id route
router.get("/my-reports", protect, getMyReports);

// 📌 Get a single report by ID
router.get("/:id", getReportById);

// 📌 Update a report by ID
router.put("/:id", updateReport);

// 📌 Delete a report by ID
router.delete("/:id", deleteReport);

export default router;

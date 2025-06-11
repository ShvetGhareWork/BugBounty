import express from "express";
import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} from "../controllers/reportController.js";

const router = express.Router();

// 📌 Create a new report
router.post("/", createReport);
// 📌 Get all reports
router.get("/", getAllReports);
// 📌 Get a single report by ID
router.get("/:id", getReportById);
// 📌 Update a report by ID
router.put("/:id", updateReport);
// 📌 Delete a report by ID
router.delete("/:id", deleteReport);

export default router;

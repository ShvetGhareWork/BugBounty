import express from "express";
import {
  createTest,
  getTests,
  getTestById,
  deleteTest,
  updateTest,
} from "../controllers/testController.js";

const router = express.Router();

router.post("/addtests", createTest);
router.get("/gettests", getTests);
router.get("/gettests/:id", getTestById);
router.delete("/deletetests/:id", deleteTest);
router.put("/updatetests/:id", updateTest);

export default router;

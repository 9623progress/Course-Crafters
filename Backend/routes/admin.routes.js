import express from "express";
import {
  courseCreatedByAdmin,
  createCourse,
  createCourseContent,
} from "../controllers/admin.controller.js";
import upload from "../config/multer.js";
import { isAdmin } from "../utils/middlewares.js";

const router = express.Router();

router.post("/create-course/:id", isAdmin, upload.single("file"), createCourse);
router.post(
  "/create-course-content/:id",
  isAdmin,
  upload.single("file"),
  createCourseContent
);

router.get("/getAdminCourse/:id", isAdmin, courseCreatedByAdmin);

export default router;

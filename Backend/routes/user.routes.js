import express from "express";
import {
  courseFilter,
  createOrder,
  getAllCourses,
  getMyCourses,
  handlePaymentSuccess,
  login,
  logout,
  signup,
  viewCourse,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../utils/middlewares.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/create-order", isAuthenticated, createOrder);
router.post("/payment-success", isAuthenticated, handlePaymentSuccess);
router.get("/getAllcourses", getAllCourses);
router.get("/getMyCourses/:id", isAuthenticated, getMyCourses);
router.get("/viewCourse/:id", isAuthenticated, viewCourse);
router.post("/filterCourse", courseFilter);
export default router;

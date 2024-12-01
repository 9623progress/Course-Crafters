//task-
//login, signup,purchase,view courses
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { z } from "zod";
// import PayPal from "@paypal/checkout-server-sdk";
// import getPayPalClient from "../config/Paypal.js";
import { razorpay } from "../config/razorpay.js";
import { Course } from "../model/course.model.js";
// import payment from "../model/purchase.model.js";
import payment from "../model/purchase.model.js";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const requireBody = z.object({
      name: z.string().min(3).max(50),
      email: z.string().min(3).max(50).email(),
      mobile: z
        .string()
        .regex(/^[0-9]{10}$/, "Mobile number must contain 10 digits"),
      password: z
        .string()
        .regex(
          /[A-Z]/,
          "Password must contain at least one uppercase character"
        )
        .regex(
          /[a-z]/,
          "Password must contain at least one lowercase character"
        )
        .regex(/\d/, "Password must contain at least one number")
        .regex(
          /[@$!%*?&]/,
          "Password must contain at least one special character like @$!%*?&"
        ),
    });

    const { name, email, mobile, password } = req.body;

    const parsedData = requireBody.safeParse({ name, email, mobile, password });

    if (!parsedData.success) {
      return res.status(400).json({
        message: parsedData.error.issues[0].message,
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const role = "user";
    const HashPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, mobile, password: HashPassword, role });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "wrong email or password" });
    }

    const HashPassword = user.password;

    const isMatch = await bcrypt.compare(password, HashPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "wrong email or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRETE
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //1day
      sameSite: "None",
    });

    const userData = {
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      id: user._id,
    };
    res
      .status(200)
      .json({ message: `Welcome Back ${user.name}`, user: userData });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Failed to logout", error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Validate userId and courseId before querying the DB
    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ message: "User ID and Course ID are required." });
    }

    // Fetch the course and user from the database
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const options = {
      amount: course.price * 100, // Razorpay expects the amount in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: `order_rcptid_${Math.random().toString(36).substring(7)}`,
      payment_capture: 1, // Auto capture payment
    };

    // Create the order with Razorpay
    razorpay.orders.create(options, async (err, order) => {
      if (err) {
        console.error("Error creating Razorpay order", err);
        return res
          .status(500)
          .json({ message: "Error creating Razorpay order", error: err });
      }

      // Create a payment record
      await payment.create({
        transactionID: order.id,
        amount: course.price,
        status: "pending",
        userID: userId,
        courseID: courseId,
        currency: "INR",
      });

      // Add the course to the user's courseBuy array (linking the payment reference)
      user.courseBuy.push(courseId);

      // Save the updated user
      await user.save();

      // Send response with Razorpay order details and payment information
      res.status(201).json({ order });
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ message: "Error processing order", error });
  }
};

export const handlePaymentSuccess = async (req, res) => {
  try {
    console.log("handlePayment call");
    const { paymentId, orderId } = req.body;

    // Validate input
    if (!paymentId || !orderId) {
      return res
        .status(400)
        .json({ message: "Payment ID and Order ID are required." });
    }

    const paymentRecord = await payment.findOne({ transactionID: orderId });
    // console.log(paymentRecord);
    if (!paymentRecord) {
      // console.log("payment record not found");
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update payment status to 'success'
    paymentRecord.status = "success";
    await paymentRecord.save();

    const user = await User.findById(paymentRecord.userID);
    if (user) {
      // You could update user-related status if needed (like course access)
      // Example: user.coursesAccessed.push(paymentRecord.courseID);
      // await user.save();
    }

    res.status(200).json({
      message: "Payment successfully processed",
      payment: paymentRecord,
    });
  } catch (error) {
    console.error("Error handling payment success:", error);
    res.status(500).json({ message: "Error handling payment success", error });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).json({ courses: course });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("courseBuy");

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    return res.status(200).json({ course: user.courseBuy });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const viewCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate("content");

    if (!course) {
      return res.status(400).json({ message: "course not found" });
    }

    return res.status(200).json({ content: course.content });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const courseFilter = async (req, res) => {
  try {
    const { keyword } = req.body;
    let courses;

    if (keyword) {
      courses = await Course.find({
        name: { $regex: keyword, $options: "i" },
      });
    }

    res.json({ course: courses });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Error fetching courses from database" });
  }
};

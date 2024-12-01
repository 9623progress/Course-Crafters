// import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "please log in first" });
    }

    const jwtS = process.env.JWT_SECRETE;
    // console.log(token, jwtS);
    const data = jwt.verify(token, jwtS);
    if (data.role === "admin") {
      next();
    } else {
      return res.status(401).json({ message: "you are not admin" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Integrnal server error" });
  }
};

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "please log in first" });
    }
    const isMatch = jwt.verify(token, process.env.JWT_SECRETE);
    if (!isMatch) {
      return res.status(401).json({ message: "please log in first" });
    }

    next();
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

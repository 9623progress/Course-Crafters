import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

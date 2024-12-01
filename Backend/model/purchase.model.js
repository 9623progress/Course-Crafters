import mongoose from "mongoose";

const Payment = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    CourseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      require: true,
    },
    amount: {
      type: String,
    },
    currency: {
      type: String,
    },
    status: {
      type: String,
    },
    transactionID: {
      type: String,
    },
  },
  { timestamps: true }
);

const payment = mongoose.model("Payment", Payment);

export default payment;

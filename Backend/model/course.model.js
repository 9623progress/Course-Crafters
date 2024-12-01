import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ["video", "image", "text"], // Specify content types
  },
  url: {
    type: String,
    required: true, // URL of the video/image
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+$/.test(v); // Ensure it's a valid URL
      },
      message: "Invalid URL",
    },
  },
  description: {
    type: String,
    maxlength: 500, // Optional description for the content
  },
});

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    tagline: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    image: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(v);
        },
        message: "Invalid image URL",
      },
    },
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "courseContent" }],
    User: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
const courseContent = mongoose.model("courseContent", contentSchema);
export { Course, courseContent };

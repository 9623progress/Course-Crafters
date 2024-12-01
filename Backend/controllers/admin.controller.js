import { Course, courseContent } from "../model/course.model.js";

import { User } from "../model/user.model.js";
import { uploadToCloudinary } from "../utils/upload.js";

export const createCourse = async (req, res) => {
  try {
    const { name, price, desc, tagline } = req.body;
    const authorID = req.params.id;
    const image = req.file;

    if (!name || !price || !desc || !image || !tagline) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!image) {
      return res.status(400).json({ message: "file is required" });
    }

    const imageUrl = await uploadToCloudinary(
      req.file.buffer,
      "course/image",
      "image"
    );

    if (!imageUrl) {
      return res.status(400).json({ message: "Cloudinary image url error" });
    }

    // console.log(imageUrl);

    await Course.create({
      name: name,
      price: price,
      authorID: authorID,
      desc: desc,
      image: imageUrl,
      tagline: tagline,
      content: [],
    });

    res.status(201).json({ message: "Course created sucessfully" });
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({ message: "Failed to create course", error: error.message });
  }
};

export const createCourseContent = async (req, res) => {
  try {
    const { desc, courseId, title } = req.body;
    const url = req.file;
    const author = req.params.id;

    // console.log(desc, courseId, title, url, author);

    const user = await User.findById(author);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({ message: "course not found" });
    }

    // console.log(url);
    if (!url) {
      return res.status(400).json({ message: "media file is necessary" });
    }

    if (!url.mimetype) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    // console.log(url.mimetype);

    const mediaType = url.mimetype.startsWith("image") ? "image" : "video";
    const folder = mediaType === "image" ? "course/image" : "course/video";

    const media_url = await uploadToCloudinary(url.buffer, folder, mediaType);

    // console.log(media_url);

    const media_content = await courseContent.create({
      title: title,
      type: mediaType,
      url: media_url,
      description: desc,
    });

    // console.log(Array.isArray(course.content));
    // console.log(media_content);

    course.content.push(media_content._id);
    course.save();

    res.status(201).json({ message: "content added sucessfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal server error" }); // In case of error
  }
};

export const courseCreatedByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const courses = await Course.find({ authorID: id });
    res.status(200).json({ course: courses });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

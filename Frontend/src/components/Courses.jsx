import React, { useEffect, useState } from "react";
import CourseBox from "./CourseBox";
import axios from "axios";
import { toast } from "react-toastify";

const Courses = () => {
  const [courses, SetCourses] = useState([]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/getAllcourses`
      );
      if (response.status == 200) {
        SetCourses(response.data.courses);
        // console.log(response.data.courses);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);
  return (
    <div className=" mt-10  ">
      <h1 className="text-center font-extrabold text-4xl text-black m-5">
        Courses
      </h1>
      <div className="flex flex-wrap justify-around mx-2 md:mx-10 ">
        {courses.map((course) => {
          return (
            <CourseBox
              key={course._id}
              courseData={{ course: course, payment: false }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Courses;

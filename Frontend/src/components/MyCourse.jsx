import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CourseBox from "./CourseBox";
import payment from "../../../Backend/model/purchase.model";
import axios from "axios";
import { toast } from "react-toastify";

const MyCourse = () => {
  const [myCourse, setMyCourse] = useState([]);
  const { id } = useSelector((state) => state.user);
  const fetchMyCourses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/getMyCourses/${id}`,

        { withCredentials: true }
      );

      if (response.status == 200) {
        // console.log(response);
        // console.log(response.data.course);
        setMyCourse(response.data.course);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message || "something went wrong");
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);
  return (
    <div className=" pt-36">
      <div className="mb-10 text-center">
        <h1 className="font-semibold text-3xl text-blue-700">
          {" "}
          Welcome to your courses{" "}
        </h1>
        <p className="font-bold text-xl text-slate-700">
          Keep Learning and Keep smiling
        </p>
        <p className="font-bold text-xl text-slate-700">
          It is never too late to be what you might have been
        </p>
      </div>
      <div className="flex justify-around">
        {myCourse?.map((course) => (
          <CourseBox
            key={course._id}
            courseData={{ course: course, payment: false, buy: true }}
          />
        ))}
      </div>
      {myCourse.length === 0 && (
        <p className="font-bold text-center text-gray-500 text-2xl mt-20">
          You have not buy any course yet
        </p>
      )}
    </div>
  );
};

export default MyCourse;

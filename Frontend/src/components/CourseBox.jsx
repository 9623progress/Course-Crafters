import React from "react";
import courseThumbnail from "../assets/course thumbnail (2).png";
import { Link } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import { useSelector } from "react-redux";
import HtmlRender from "./HtmlRender";
import { toast } from "react-toastify";

const CourseBox = ({ courseData }) => {
  const course = courseData.course;
  const payment = courseData.payment;
  const buy = courseData.buy || false;
  let id;

  if (payment) {
    id = useSelector((state) => state?.user?.id);
  }
  const handlNotLoggin = () => {
    toast.error("Login Please");
  };

  return (
    <div className="border w-96 border-gray-400 rounded-xl mb-5">
      <img
        className="rounded-t-xl"
        src={course.image || courseThumbnail}
        alt="Course Thumbnail"
      />
      <div className="p-2">
        <h1 className="text-xl font-bold text-blue-900 font-Poppins">
          {course.name}
        </h1>
        <div className="font-medium text-gray-600 mt-2">
          <HtmlRender htmlContent={course.tagline} />
        </div>
        <p className="text-green-600 font-semibold text-lg mt-2">
          Price: ${course.price}
        </p>

        <button className="bg-blue-700 p-2 mb-2 text-white text-lg rounded-xl w-full">
          <Link to="/course-details" state={course} className="">
            View Details
          </Link>
        </button>

        {payment && id && <PaymentPage courseId={course._id} userId={id} />}

        {payment && !id && (
          <button
            className="bg-blue-700 p-2 mb-2 text-white text-lg rounded-xl w-full "
            onClick={handlNotLoggin}
          >
            Pay Now
          </button>
        )}
        {/* If the user has bought the course, show the View Course button */}
        {buy && (
          <button className="bg-blue-700 p-2 text-white mt-2 text-lg rounded-xl w-full">
            <Link to="/view-course" state={course._id} className="">
              View Course
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseBox;

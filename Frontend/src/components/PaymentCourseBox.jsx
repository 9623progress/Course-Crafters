import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const PaymentCourseBox = ({ course }) => {
  return (
    <div className="border w-96 border-gray-400  rounded-xl mb-5">
      <img className=" rounded-t-xl" src={course.image} alt="" />
      <div className="p-2 ">
        <h1 className="  text-xl font-bold text-blue-900 font-Poppins">
          {course.name}
        </h1>
        <p className="font-medium text-gray-600 mt-2">{course.desc}</p>
        <p className="text-green-600 font-semibold text-lg mt-2">
          Price:- ${course.price}
        </p>
        <button className="w-full bg-blue-700 p-2 text-white  text-lg rounded-xl">
          <Link to="/">Buy Now</Link>
        </button>
      </div>
    </div>
  );
};

export default PaymentCourseBox;

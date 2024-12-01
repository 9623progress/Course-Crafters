import React from "react";
import { useLocation } from "react-router-dom";
import PaymentCourseBox from "./PaymentCourseBox";
import CourseBox from "./CourseBox";
import HtmlRender from "./HtmlRender";

const CourseDetails = () => {
  const location = useLocation();
  const course = location.state;
  const data = { course, payment: true };
  return (
    <div className="flex flex-col  lg:flex-row mb-0 pt-40 justify-around items-center md:mx-10 gap-5 ">
      <CourseBox courseData={data} />
      <div className="border rounded-lg w-full p-3">
        <h1 className="text-3xl text-center text-blue-600 font-semibold">
          {course.name}
        </h1>

        <div className="text-lg pt-3 font-semibold">
          <p>Details</p>
        </div>
        <div>
          <h1 className="text-red-700 text-lg font-semibold">
            <span className="text-xl font-bold">Warning: </span>
            This website is made for learning purposes only. The payment mode is
            set to test mode, so no actual charges will be made to your account.
            Please do not enter your real account details. To test payments,
            select 'Wallet', then choose 'Airtel Wallet', and click 'Success'.
          </h1>
        </div>
        <div className="pt-3 text-lg font-serif">
          <HtmlRender htmlContent={course.desc} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

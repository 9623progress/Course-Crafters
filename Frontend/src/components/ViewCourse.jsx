import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const ViewCourse = () => {
  const location = useLocation();
  const courseId = location.state;
  const [contentArray, setContentArray] = useState([]);
  const [content, setContent] = useState("");

  const fetchCourseContent = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/viewCourse/${courseId}`,
        { withCredentials: true }
      );
      // console.log(response);
      if (response.status === 200) {
        // console.log(response.data.content);
        setContentArray(response.data.content);
      }
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  };

  useEffect(() => {
    fetchCourseContent();
  }, []);

  const HandleContentClick = (content) => {
    setContent(content);
    // console.log(content);
  };

  return (
    <div className="pt-4 px-2 ">
      <div className="border border-b-0 border-gray-400 py-1 flex px-3 justify-between">
        <Link
          to={"/"}
          className=" font-bold p-2 rounded-sm bg-blue-500"
          href=""
        >
          Home
        </Link>
        <Link
          to="/profile"
          className=" border rounded-full p-1 px-2  hover:bg-slate-300 text-white  font-normal"
        >
          &#128100;
        </Link>
      </div>
      <div className="flex flex-col md:flex-row border border-gray-400 ">
        <div className="w-full md:w-1/4 border-r border-gray-300  ">
          <h2 className="text-lg font-bold  my-2 text-center - text-blue-700 ">
            Content List
          </h2>
          <div className="border-t border-gray-300" />
          <div className="">
            {contentArray.map((content) => (
              <div
                key={content._id}
                className=" cursor-pointer p-2 border-b border-gray-300  hover:bg-blue-100 transition"
                onClick={() => {
                  HandleContentClick(content);
                }}
              >
                {content.title || "Empty"}
              </div>
            ))}
          </div>
        </div>

        {!content ? (
          <div className="h-full ">
            {" "}
            <h2 className="text-center"> choose content</h2>
          </div>
        ) : (
          <div>
            {" "}
            <div className="w-full md:w-3/4 p-4 flex-col justify-center items-center bg-white">
              {content && content.type == "image" ? (
                <div className="flex justify-center">
                  <img
                    src={content.url}
                    alt="Course Content"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              ) : (
                <div className="flex justify-center">
                  <video
                    className="w-full md:w-3/4 rounded-lg shadow-md"
                    src={content.url}
                    controls
                  ></video>
                </div>
              )}
              <div>
                <h2 className="font-medium text-xl">{content.description}</h2>
              </div>
            </div>
          </div>
        )}

        {/* Content Viewer */}
      </div>
    </div>
  );
};

export default ViewCourse;

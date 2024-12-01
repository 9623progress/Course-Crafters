import React, { Component, useState } from "react";
// import logo from "../assets/learnify_logo.png";
import reactlogo from "../assets/react.jpg";
import git from "../assets/github.jpg";
import mongo from "../assets/mongo.png";
import js from "../assets/jvascript.png";
// import Courses from "./Courses";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const handleOnChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/filterCourse`,
        { keyword: keyword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setResult(response.data.course);
      }
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-32 text-center  xl:mx-40 2xl:mx-80  relative p-3 md:p-32">
      <img
        src={reactlogo}
        alt="Logo"
        className="absolute hidden md:block  rounded-full top-0 right-0 w-14 h-14 animate-float "
      ></img>
      <img
        src={git}
        alt="Logo"
        className="absolute hidden md:block rounded-full bottom-6 left-10 w-14 h-14 animate-float"
      ></img>
      <img
        src={mongo}
        alt="Logo"
        className="absolute hidden md:block rounded-full bottom-0 right-0 w-14 h-14 animate-float"
      ></img>
      <img
        src={js}
        alt="Logo"
        className="absolute  hidden md:block rounded-full top-20 left-10 w-14 h-14 animate-float"
      ></img>

      <div>
        <p className="text-gray-600 text-3xl font-bold">Welcome to </p>
        <h1 className="text-7xl font-extrabold m-5">
          {" "}
          <span className="text-blue-600">Course</span> Crafters
        </h1>
        <p className="text-gray-600 text-xl font-semibold">
          A platform where you'll find the right content to help you improve
          your skills and grow your knowledge.
        </p>

        <button
          className="border border-gray-300 w-full p-3 m-3 rounded-lg text-left"
          onClick={() => {
            setModal(true);
          }}
        >
          {" "}
          Search
        </button>
        {modal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-96 p-6 relative">
              {loading ? (
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              ) : (
                <div>
                  <div className="flex shrink-0 pt-3 ">
                    <input
                      type="text"
                      placeholder="Search"
                      className="border border-gray-300 w-full p-3   text-left"
                      onChange={handleOnChange}
                      value={keyword}
                    />
                    <button
                      className="bg-blue-800 p-3 text-white"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                  <div>
                    {result ? (
                      <div className="flex flex-col mt-6 space-y-4">
                        {result.map((course) => (
                          <Link
                            key={course._id}
                            className="block border border-gray-300 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors duration-300 shadow-md hover:shadow-lg"
                            to="/course-details"
                            state={course}
                          >
                            <div className="text-lg font-semibold text-gray-800">
                              {course.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div>No data</div>
                    )}
                  </div>
                  <button
                    onClick={() => setModal(false)}
                    className="absolute top-0 right-2 text-gray-600 text-4xl"
                  >
                    &times;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

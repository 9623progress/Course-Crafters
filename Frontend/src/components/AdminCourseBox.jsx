import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import HtmlRender from "./HtmlRender";
import { ClipLoader } from "react-spinners";

const AdminCourseBox = ({ courseID, course }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { id } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const HandleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    if (field === "title") {
      setTitle(value);
    } else if (field === "desc") {
      setDesc(value);
    } else if (field === "file") {
      setFile(e.target.files[0]); // Get the first selected file
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("file", file);
      formData.append("courseId", courseID);

      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/create-course-content/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message || "content added sucessfully");
      }
    } catch (error) {
      // console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(`Error: ${errorMessage}`);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
    // console.log(title, desc, file);
  };

  return (
    <div className="border w-96 border-gray-400 rounded-xl mb-5 ">
      <img className="rounded-t-xl" src={course.image} alt="" />
      <div className="p-2 ">
        <h1 className="text-xl font-bold text-blue-900 font-Poppins">
          {course.name}
        </h1>
        <div className="font-medium text-gray-600 mt-2">
          <HtmlRender htmlContent={course.tagline} />
        </div>
        <p className="text-green-600 font-semibold text-lg mt-2">
          Price: ₹{course.price}
        </p>
        <div className="mb-2">
          <button className="w-full bg-blue-700 p-2 text-white text-lg rounded-xl">
            <Link to={"/course-details"} state={course}>
              View Details
            </Link>
          </button>
          <button
            className="w-full bg-blue-700 p-2 text-white text-lg rounded-xl mt-2"
            onClick={() => setModal(true)}
          >
            Add Content
          </button>
          <button className="w-full bg-blue-700 p-2 text-white text-lg rounded-xl mt-2">
            <Link to={"/view-course"} state={course._id}>
              View Course
            </Link>
          </button>
        </div>

        {modal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-96 p-6 relative">
              {loading ? (
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              ) : (
                <div>
                  {" "}
                  <h2 className="text-xl font-semibold mb-4 text-wrap">
                    Add Course Content for {course.name}
                  </h2>
                  <div className="flex-col">
                    <input
                      type="text"
                      placeholder="Topic Title"
                      className="border border-gray-500 p-1 w-full mb-2 rounded-md"
                      name="title"
                      onChange={HandleOnChange}
                      value={title}
                    />
                    <textarea
                      name="desc"
                      id="desc"
                      rows={10}
                      className="border border-gray-400 w-full rounded-md p-2"
                      placeholder="Add content description (try to add in html format)"
                      onChange={HandleOnChange}
                      value={desc}
                    ></textarea>
                    <input
                      type="file"
                      placeholder="Add media"
                      className="border border-gray-500 p-1 w-full mb-2 rounded-md"
                      name="file"
                      onChange={HandleOnChange}
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                      onClick={handleSubmit}
                    >
                      Save Content
                    </button>
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

export default AdminCourseBox;

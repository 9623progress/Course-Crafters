import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminCourseBox from "./AdminCourseBox";
import { useSelector } from "react-redux";
import axios from "axios"; // Make sure to import axios
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const { id } = useSelector((state) => state.user); // Use useSelector correctly
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tagline, setTagline] = useState("");

  const HandleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    if (field == "name") {
      setName(value);
    } else if (field == "price") {
      setPrice(value);
    } else if (field == "desc") {
      setDesc(value);
    } else if (field == "file") {
      setFile(e.target.files[0]);
    } else if (field == "tagline") {
      setTagline(value);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!file) {
      alert("Please select a file.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("file", file);
      formData.append("price", price);
      formData.append("tagline", tagline);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/create-course/${id}`,
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
      setDesc("");
      setName("");
      setTagline("");
      setPrice("");
      setFile(null);
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin/getAdminCourse/${id}`,
          { withCredentials: true }
        );
        // console.log(response);
        setCourses(response.data.course); // Assuming response contains course data
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    if (id) {
      fetchCourses();
    }
  }, [id]); // Add dependency on 'id' to re-fetch when the user ID changes

  return (
    <div className="mt-40 text-center">
      <h1 className="text-4xl m-2 font-semibold mb-5">
        Welcome to Admin Dashboard
      </h1>
      <button
        className="bg-black  text-white border rounded-xl p-2 px-4 text-xl hover:bg-slate-400"
        onClick={() => {
          setModal(true);
        }}
      >
        Create Course
      </button>

      {courses.length > 0 ? (
        <div className="mt-16 ">
          <h2 className=" text-blue-700 text-xl font-semibold ">
            Your created courses
          </h2>
          <div className="mt-3 flex justify-around flex-wrap">
            {courses.map((course) => (
              <AdminCourseBox
                key={course._id}
                courseID={course._id}
                course={course}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No courses found</p>
      )}

      {modal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            {loading ? (
              <ClipLoader size={50} color={"#123abc"} loading={loading} />
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Create Course</h2>
                <div className="flex-col">
                  <input
                    type="text"
                    placeholder="Name of Course"
                    className="border border-gray-500 p-1 w-full mb-2 rounded-md"
                    name="name"
                    onChange={HandleOnChange}
                    value={name}
                  />
                  <input
                    type="text"
                    placeholder="Tagline"
                    className="border border-gray-500 p-1 w-full mb-2 rounded-md"
                    name="tagline"
                    onChange={HandleOnChange}
                    value={tagline}
                  />
                  <input
                    type="number"
                    placeholder="Price of course"
                    className="border border-gray-500 p-1 w-full mb-2 rounded-md"
                    name="price"
                    onChange={HandleOnChange}
                    value={price}
                  />
                  <textarea
                    type="text"
                    placeholder="Description of Course (try to add in html format)"
                    className="border border-gray-500 p-1 w-full mb-2 rounded-md"
                    name="desc"
                    onChange={HandleOnChange}
                    value={desc}
                    rows={10}
                  />
                  <input
                    type="file"
                    className="border border-gray-500 p-1 w-full mb-2 rounded-md"
                    name="file"
                    onChange={HandleOnChange}
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleSubmit}
                  >
                    Create Course
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
  );
};

export default Admin;

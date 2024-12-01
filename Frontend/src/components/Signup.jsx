import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const filed = e.target.name;
    const value = e.target.value;
    if (filed == "name") {
      setName(value);
    } else if (filed == "email") {
      setEmail(value);
    } else if (filed == "mobile") {
      setMobile(value);
    } else if (filed == "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/signup`,
        {
          name: name,
          email: email,
          mobile: mobile,
          password: password,
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message); // Show success message
        // console.log(response);
        navigate("/login");
      } else {
        toast.error(response.data.message || "Something went wrong"); // Show error message
        // console.log(response);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Network Error"); // Handle errors properly
      console.error(error);
    }

    // console.log(name, email, password, mobile); // Logging form data
  };
  return (
    <div className=" text-center    flex items-center justify-center h-screen">
      <div className=" border border-gray-400 rounded-lg w-96  p-3 py-8">
        <h1 className="font-bold text-blue-950 text-xl">Create Account</h1>

        <input
          className="border border-gray-400 rounded-md w-full p-2 mt-5"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleOnchange}
        />
        <input
          className="border border-gray-400 rounded-md w-full p-2 mt-1"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleOnchange}
        />
        <input
          className="border border-gray-400 rounded-md w-full p-2 mt-1"
          type="text"
          placeholder="Mobile"
          name="mobile"
          value={mobile}
          onChange={handleOnchange}
        />
        <input
          className="border border-gray-400 rounded-md w-full p-2 mt-1"
          type="text"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleOnchange}
        />
        <button
          className="w-full border rounded-md bg-blue-700 text-white font-bold p-2 mt-4 hover:bg-blue-500"
          onClick={handleSubmit}
        >
          Create Account
        </button>
        <div className="mt-5">
          <p className="text-gray-600 font-semibold">Already Have Account ?</p>
          <Link className="text-blue-500 text-lg" to="/login">
            {" "}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

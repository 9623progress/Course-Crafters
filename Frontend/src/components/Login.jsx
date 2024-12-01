import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../Redux/slices/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/login`,
        {
          email: email,
          password: Password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(login(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      // console.log(response);
      // console.log(email, Password);
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
  };

  return (
    <div className=" text-center    flex items-center justify-center h-screen">
      <div className=" border border-gray-400 rounded-lg w-96  p-3 py-8">
        <h1 className="font-bold text-blue-950 text-xl">Login</h1>
        <input
          className="border border-gray-400 rounded-md w-full p-2 mt-5"
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleOnChange}
          value={email}
        />
        <input
          className="border border-gray-400 rounded-md w-full p-2 mt-1"
          type="text"
          placeholder="Password"
          name="password"
          onChange={handleOnChange}
          value={Password}
        />
        <button
          onClick={handleSubmit}
          className="w-full border rounded-md bg-blue-700 text-white font-bold p-2 mt-4 hover:bg-blue-500"
        >
          Login
        </button>
        <div className="mt-5">
          <p className="text-gray-600 font-semibold">Don't have account</p>
          <Link className="text-blue-500 text-lg" to="/signup">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

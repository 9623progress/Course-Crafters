import React, { useState } from "react";
import logo from "../assets/learnify_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/userSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isAdmin = useSelector((state) => state.isAdmin);
  // const { isLoggedIn, isAdmin } = useSelector((state) => state);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const navLinks = (
    <>
      <Link to="/" className="hover:text-blue-500">
        Home
      </Link>
      {isLoggedIn && (
        <Link to="/myCourses" className="hover:text-blue-500">
          My Courses
        </Link>
      )}
    </>
  );

  const authLinks = isLoggedIn ? (
    <>
      <button
        onClick={logoutHandler}
        className="bg-black border rounded-xl p-2 px-3 hover:bg-slate-300 text-white font-normal"
      >
        Log out
      </button>
      {isAdmin && (
        <Link
          to="/admin"
          className="bg-black border rounded-xl p-2 px-3 hover:bg-slate-300 text-white font-normal"
        >
          Dashboard
        </Link>
      )}
      <Link
        to="/profile"
        className="border rounded-full s p-2 px-3 hover:bg-slate-300 text-white font-normal"
      >
        &#128100;
      </Link>
    </>
  ) : (
    <Link
      to="/login"
      className="bg-black border rounded-xl p-2 px-3 hover:bg-slate-800 text-white font-semibold"
    >
      Login
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 lg:mx-24 md:mx-4 my-6 border border-gray-200 rounded-xl shadow-sm bg-white z-10 p-4">
      <div className="flex justify-between items-center font-bold font-poppins text-lg">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <img
              className="w-12 h-12 rounded-full"
              src={logo}
              alt="Course Crafters Logo"
            />
          </Link>
          <Link to="/" className="text-slate-950 font-bold text-2xl">
            Course Crafters
          </Link>
        </div>

        {/* menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-2xl"
          aria-label="Toggle Menu"
        >
          &#9776;
        </button>

        {/* Desktop  Links */}
        <div className="hidden sm:flex items-center gap-x-6">{navLinks}</div>

        {/* Desktop  Links */}
        <div className="hidden sm:flex items-center gap-x-4">{authLinks}</div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden flex flex-col mt-4 gap-y-2">
          <div className="flex flex-col gap-y-2">{navLinks}</div>
          <div className="flex flex-col gap-y-2">{authLinks}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

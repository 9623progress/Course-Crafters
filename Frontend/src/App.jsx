// import React, { useState } from "react";
import "./App.css";
// import axios from "axios";
// import PaymentPage from "./components/PaymentPage"; // The component we previously created for payment
// import Navbar from "./components/Navbar";

// function App() {
//   // // State to manage selected course and user
//   // const [userId, setUserId] = useState("6745609fd8bc0236ab4530b9"); // Replace with actual user ID (can be dynamic based on authentication)
//   // const [courseId, setCourseId] = useState("674568b58eadec6173ff676a"); // Replace with actual course ID (can be dynamic based on selected course)

//   // // Handler for changing course selection (for demonstration purposes)
//   // const handleCourseSelect = (e) => {
//   //   setCourseId(e.target.value);
//   // };

//   return (
//     <div className="bg-red-600">
//       {/* <h1>Course Payment System</h1>

//       <div className="course-selection">
//         <h3>Select a Course</h3>
//         <select value={courseId} onChange={handleCourseSelect}>
//           {/* Add dynamic options here based on available courses */}
//       {/* <option value="67890">Course 1 - $50</option>
//           <option value="12345">Course 2 - $100</option>
//         </select> */}
//       {/* </div>  */}

//       {/* Payment Page Component */}
//       {/* <PaymentPage userId={userId} courseId={courseId} /> */}

//       <Navbar />
//     </div>
//   );
// }

// export default App;

import React from "react";
import Home from "./components/Home";
import Courses from "./components/Courses";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import { IsAdminRoute, IsAuthenticatedRoute } from "./utils/ProtectedRoutes";
// import CreateCourse from "./components/CreateCourse";
// import AddContent from "./components/AddContent";
import CourseDetails from "./components/CourseDetails";
import MyCourse from "./components/MyCourse";
import ViewCourse from "./components/ViewCourse";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <Home />
              <Courses />
            </>
          ),
        },
        {
          path: "/admin",
          element: (
            <IsAdminRoute>
              <Admin />
            </IsAdminRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <IsAuthenticatedRoute>
              <Profile />
            </IsAuthenticatedRoute>
          ),
        },
        // {
        //   path: "/create-course",
        //   element: (
        //     <IsAdminRoute>
        //       <CreateCourse />
        //     </IsAdminRoute>
        //   ),
        // },
        // {
        //   path: "/add-content",
        //   element: (
        //     <IsAdminRoute>
        //       <AddContent />
        //     </IsAdminRoute>
        //   ),
        // },
        {
          path: "/course-details",
          element: <CourseDetails />,
        },
        {
          path: "/myCourses",
          element: (
            <IsAuthenticatedRoute>
              <MyCourse />
            </IsAuthenticatedRoute>
          ),
        },
      ],
    },
    {
      path: "/view-course",
      element: (
        <IsAuthenticatedRoute>
          <ViewCourse />
        </IsAuthenticatedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <div className="h-screen ">
      <ToastContainer />

      <RouterProvider router={router} />
    </div>
  );
};

export default App;

import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="border rounded-xl border-gray-500 mt-40 m-5 sm:m-40">
      <div className="border-b border-gray-500 p-5">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500">
          {" "}
          This page shows you your profile and account details
        </p>
      </div>
      <div className="flex justify-center m-6">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-300 text-white font-bold text-4xl">
          {user.name.charAt(0)}
        </div>
      </div>
      <div className="mt-5 font-bold">
        <div className="m-2">
          <h1 className="p-2">Your Name</h1>
          <p className="p-2 border-2 rounded-md  text-gray-500 ">{user.name}</p>
        </div>
        <div className="m-2">
          <h1 className="px-2">Your Email</h1>
          <p className="p-2 border-2 rounded-md text-gray-500">{user.email}</p>
        </div>
        <div className="m-2">
          <h1 className="px-2">Your Mobile</h1>
          <p className="p-2 border-2 rounded-md  text-gray-500 ">
            {user.mobile}
          </p>
        </div>
        <div className="m-2">
          <h1 className="px-2">Your Role</h1>
          <p className="p-2 border-2 rounded-md  text-gray-500 ">{user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

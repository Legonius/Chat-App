import React from "react";
import { Link } from "react-router-dom";

const AllUsers = () => {
  return (
    <Link to={"/msg"}>
      <div className="flex items-center mb-2 p-2 overflow-hidden rounded-lg bg-slate-50 gap-4">
        <img
          className="h-12 bg-cover rounded-full"
          src="../../public/avatar.jpeg"
          alt="profile pic"
        />
        <div>
          <p className="text-slate-700">Username</p>
          <span className="text-slate-300">Enter to chat</span>
        </div>
      </div>
    </Link>
  );
};

export default AllUsers;

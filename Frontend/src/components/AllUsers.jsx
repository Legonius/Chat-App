import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Message from "../pages/Message";

const AllUsers = ({ data }) => {
  return (
    <Link to={`/msg/${data._id}`}>
      <div className="flex items-center mb-2 p-2 overflow-hidden rounded-lg bg-slate-50 gap-4">
        <img
          className=" max-h-12 w-12 bg-cover rounded-full"
          src={
            data.avatar === "default"
              ? `../../public/${data.gender}.jpeg`
              : `http://localhost:15000/public/images/${data.avatar}`
          }
          alt="profile pic"
        />
        <div>
          <p className="text-slate-700">{data.username}</p>
          <span className="text-slate-300">Enter to chat</span>
        </div>
      </div>
    </Link>
  );
};

export default AllUsers;

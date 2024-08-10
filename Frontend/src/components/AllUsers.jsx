import React from "react";
import { Link } from "react-router-dom";

const AllUsers = ({ data }) => {
  return (
    <Link to={`/msg/${data._id}`}>
      <div className="flex items-center mb-2 p-2 overflow-hidden rounded-lg bg-slate-50 gap-4">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={
                data.avatar === "default"
                  ? `/${data.gender}.jpeg`
                  : `http://localhost:15000/public/images/${data.avatar}`
              }
              alt="profile pic"
            />
          </div>
        </div>

        <div>
          <p className="text-slate-700">{data.username}</p>
          <span className="text-slate-300">Enter to chat</span>
        </div>
      </div>
    </Link>
  );
};

export default AllUsers;

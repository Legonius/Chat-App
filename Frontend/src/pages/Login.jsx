import React from "react";
import AllUsers from "../components/AllUsers";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="overflow-y-scroll w-full h-full pt-10 ">
      <Link className="absolute right-3 top-3 text-white font-bold" to={"/"}>
        Back
      </Link>
      <AllUsers />
      <AllUsers />
      <AllUsers />
      <AllUsers />
      <AllUsers />
      <AllUsers />
      <AllUsers />
      <AllUsers />
      <AllUsers />
      <AllUsers />
    </div>
  );
};

export default Login;

import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="text-slate-400">
      <p className="mb-3 text-xl font-extrabold">Welcome!</p>
      <form className="flex flex-col gap-1">
        <label htmlFor="username">
          <span>Username</span>
        </label>
        <input
          className="rounded-md bg-slate-200 px-3 outline-none"
          type="text"
          name="username"
        />

        <label htmlFor="password">
          <span>Password</span>
        </label>
        <input
          className="rounded-md bg-slate-200 px-3 outline-none"
          type="password"
          name="password"
        />
        <button className="h-8 w-28 bg-blue-600 rounded-lg text-white hover:bg-blue-500 self-center mt-2">
          Signin
        </button>
      </form>
      <p className="mt-5">Don't have an Account?</p>
      <Link to={"/signup"}>Create account</Link>
    </div>
  );
};

export default Signin;

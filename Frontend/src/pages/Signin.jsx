import React from "react";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="text-slate-400 h-[90%] w-[90%] flex flex-col justify-center items-center">
      <p className="mb-3 text-xl font-extrabold ">Welcome!</p>
      <form className="flex flex-col gap-1">
        <label htmlFor="username">
          <span>Username</span>
        </label>
        <input
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="text"
          name="username"
          required
        />

        <label htmlFor="password">
          <span>Password</span>
        </label>
        <input
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="password"
          name="password"
          required
        />
        <button className="h-8 w-28 bg-blue-600 rounded-lg text-white hover:bg-blue-500 self-center mt-2">
          Signin
        </button>
      </form>
      <p className="mt-5">Don't have an Account?</p>
      <Link className="text-blue-400" to={"/signup"}>
        Create account
      </Link>
    </div>
  );
};

export default Signin;

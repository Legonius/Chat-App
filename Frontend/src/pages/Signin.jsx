import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSigninHook from "../Hooks/SigninHook.js";

const Signin = () => {
  const { loading, signIn } = useSigninHook();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div className="text-slate-400 h-[90%] w-[90%] flex flex-col justify-center items-center">
      <p className="mb-3 text-xl font-extrabold ">Welcome!</p>
      <form onSubmit={handleSignin} className="flex flex-col gap-1">
        <label htmlFor="email">
          <span>Email</span>
        </label>
        <input
          id="email"
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="text"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">
          <span>Password</span>
        </label>
        <input
          id="password"
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className="h-8 w-28 bg-blue-600 rounded-lg text-white hover:bg-blue-500 self-center mt-2 disabled:bg-blue-300"
        >
          Signin
        </button>
      </form>
      <p className="mt-5">Don't have an Account?</p>
      <Link className="text-blue-400" to={"/signup"}>
        Create account
      </Link>
      {loading ? <span className="loading loading-spinner"></span> : ""}
    </div>
  );
};

export default Signin;

import React, { useState } from "react";
import BackButton from "../components/BackButton.jsx";

const Signup = () => {
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    avatar: "",
  });
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUserForm({ ...userForm, [name]: value });
    console.log(name, value, checked, type);
  };
  return (
    <div className="overflow-auto hover:overflow-scroll pt-10 no-scrollbar">
      <BackButton link={""} />
      <p className="mb-3 text-xl font-extrabold ">Signup</p>
      <form className="flex flex-col gap-1">
        <label htmlFor="username">
          <span>Username</span>
        </label>
        <input
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="text"
          name="username"
          required
          value={userForm.username}
          onChange={handleChange}
        />
        <label htmlFor="email">
          <span>Email</span>
        </label>
        <input
          required
          autoComplete="username"
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="email"
          name="email"
          value={userForm.email}
          onChange={handleChange}
        />

        <label htmlFor="password">
          <span>Password</span>
        </label>
        <input
          required
          autoComplete="new-password"
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="password"
          name="password"
          value={userForm.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">
          <span>Confirm Password</span>
        </label>
        <input
          required
          autoComplete="new-password"
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="password"
          name="confirmPassword"
          value={userForm.confirmPassword}
          onChange={handleChange}
        />
        <label htmlFor="age">
          <span>Age</span>
        </label>
        <input
          required
          className="rounded-md bg-slate-200 px-2 outline-none h-7"
          type="number"
          name="age"
          value={userForm.age}
          onChange={handleChange}
        />
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Male</span>
            <input
              type="radio"
              name="gender"
              className="radio checked:bg-blue-500"
              onChange={handleChange}
              defaultChecked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Female</span>
            <input
              type="radio"
              name="gender"
              className="radio checked:bg-pink-500"
              onChange={handleChange}
            />
          </label>
        </div>
        <label htmlFor="avatar">
          <span>Upload Profile Pic</span>
        </label>
        <input
          name="avatar"
          type="file"
          className="file-input file-input-bordered file-input-xs w-full max-w-xs"
        />

        <button
          name="avatar"
          className="h-8 w-28 bg-blue-600 rounded-lg text-white hover:bg-blue-500 self-center mt-2"
        >
          Signup
        </button>
      </form>
      <span></span>
      {console.log(userForm)}
    </div>
  );
};

export default Signup;

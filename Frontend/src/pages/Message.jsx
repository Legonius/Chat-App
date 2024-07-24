import React from "react";
import { Link } from "react-router-dom";
import MsgUser from "../components/MsgUser";
import MsgSender from "../components/MsgSender";
import BackButton from "../components/BackButton.jsx";

const Message = () => {
  return (
    <div className="h-full w-full flex flex-col pt-10 justify-between">
      <div className="absolute w-full top-0 left-0 h-12 bg-slate-400 rounded-t-lg text-slate-50 font-extrabold text-xl flex items-center justify-start px-2">
        <img
          className="h-8 bg-cover rounded-full"
          src="../../public/avatar.jpeg"
          alt="profile pic"
        />
        <span className="ml-2">Username</span>
      </div>
      <BackButton link={"login"} />
      <div className="flex-grow flex-col overflow-x-scroll">
        <MsgSender />
        <MsgUser />
        <MsgSender />
        <MsgUser />
        <MsgSender />
        <MsgUser />
        <MsgSender />
        <MsgUser />
        <MsgSender />
        <MsgUser />
        <MsgSender />
        <MsgUser />
      </div>
      <form className="flex w-full h-12 items-center gap-1">
        <input
          className="flex-grow p-2 bg-slate-100 rounded-lg h-8"
          type="text"
          placeholder="type message"
        ></input>
        <button className="h-8 px-1 bg-gray-500 text-white rounded-lg">
          send
        </button>
      </form>
    </div>
  );
};

export default Message;

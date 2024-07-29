import React from "react";

const SendMsg = () => {
  return (
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
  );
};

export default SendMsg;

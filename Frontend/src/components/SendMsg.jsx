import React, { useEffect, useState } from "react";
import useSendMsgHook from "../Hooks/SendMsgHook";
import toast from "react-hot-toast";

const SendMsg = ({ receiver }) => {
  const { loading, setLoading, sendMsg } = useSendMsgHook();
  const [userMessage, setUserMessage] = useState("");
  const fetch = async (id, msg) => {
    const message = await sendMsg(id, msg);
    if (message) {
      console.log("msg just send");
      setUserMessage("");
    } else {
      toast.error("Msg not send!");
    }
    setLoading(false);
  };
  const handleChat = (e) => {
    e.preventDefault();
    fetch(receiver._id, userMessage);
  };

  return (
    <form onSubmit={handleChat} className="flex w-full h-12 items-center gap-1">
      <input
        className="flex-grow p-2 bg-slate-100 rounded-lg h-8"
        type="text"
        placeholder="type message"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      ></input>
      <button className="h-8 px-1 bg-gray-500 text-white rounded-lg">
        send
      </button>
    </form>
  );
};

export default SendMsg;

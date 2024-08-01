import React, { useCallback, useEffect, useMemo, useState } from "react";
import MsgUser from "../components/MsgUser";
import MsgSender from "../components/MsgSender";
import BackButton from "../components/BackButton.jsx";
import { useParams } from "react-router-dom";
import useMessageHook from "../Hooks/MessageHook.js";
import toast from "react-hot-toast";
import Conversations from "../components/Conversations.jsx";
import SendMsg from "../components/SendMsg.jsx";

const Message = () => {
  const { oppositeChatId } = useParams();
  console.log("oppositeChatId:", oppositeChatId);
  const { setLoading, loading, findFriend } = useMessageHook();
  const [oppositeData, setOppositeData] = useState({});

  useEffect(() => {
    const getOpsData = async (id) => {
      const res = await findFriend(id);
      console.log("res:", res);
      setOppositeData(res);
      setLoading(false);
    };
    if (oppositeChatId) getOpsData(oppositeChatId);
  }, []);
  return (
    <div className="h-full w-full flex flex-col pt-10 justify-between no-scrollbar">
      <div className="absolute w-full top-0 left-0 h-12 bg-slate-400 rounded-t-lg text-slate-50 font-extrabold text-xl flex items-center justify-start px-2">
        <img
          className="h-8 w-8 bg-cover rounded-full"
          src={
            oppositeData.avatar === "default"
              ? `../../public/${oppositeData.gender}.jpeg`
              : `http://localhost:15000/public/images/${oppositeData.avatar}`
          }
        />
        <span className="ml-2">{oppositeData.username}</span>
      </div>
      <BackButton link={"login"} />
      <div className="flex-grow flex-col overflow-x-scroll no-scrollbar">
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <Conversations receiver={oppositeData} />
        )}
      </div>
      <SendMsg />
    </div>
  );
};

export default Message;

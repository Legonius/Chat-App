import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import { useParams } from "react-router-dom";
import useMessageHook from "../Hooks/MessageHook.js";
import Conversations from "../components/Conversations.jsx";
import SendMsg from "../components/SendMsg.jsx";
import { useSocketContext } from "../Context/SocketContext.jsx";

const Message = () => {
  const { oppositeChatId } = useParams();
  const { setLoading, loading, findFriend } = useMessageHook();
  const [oppositeData, setOppositeData] = useState({});
  const { allOnlineUsers } = useSocketContext();
  let isOnline;
  if (allOnlineUsers) {
    isOnline = Object.keys(allOnlineUsers).includes(oppositeChatId);
  }

  useEffect(() => {
    const getOpsData = async (id) => {
      const res = await findFriend(id);
      setOppositeData(res);
      setLoading(false);
    };
    if (oppositeChatId) getOpsData(oppositeChatId);
  }, []);

  return (
    <div className="h-full w-full flex flex-col pt-10 justify-between no-scrollbar">
      <div className="z-30 absolute w-full top-0 left-0 h-12 bg-slate-400 rounded-t-lg text-slate-50 font-extrabold text-xl flex items-center justify-start px-2">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-8 rounded-full">
            <img
              src={
                oppositeData.avatar === "default"
                  ? `../../public/${oppositeData.gender}.jpeg`
                  : `http://localhost:15000/public/images/${oppositeData.avatar}`
              }
              alt="profile pic"
            />
          </div>
        </div>
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
      <SendMsg receiver={oppositeData} />
    </div>
  );
};

export default Message;

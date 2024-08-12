import React, { useRef } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import useConversationHook from "../Hooks/ConversationHook";
import MsgBoxes from "./MsgBoxes";
import MsgDefault from "./MsgDefault";
import { useSocketContext } from "../Context/SocketContext";

const Conversations = ({ receiver }) => {
  const { loading, getConversation } = useConversationHook();
  const { conversations, setConversations } = useAuthContext();
  const { socket } = useSocketContext();
  const msgEndRef = useRef("");
  useEffect(() => {
    if (receiver._id) {
      const fetch = async (id) => {
        const result = await getConversation(id);
        setConversations(result.data);
      };
      fetch(receiver._id);
    }
  }, [receiver]);
  useEffect(() => {
    socket.on("privateMsg", (msg) => {
      console.log(msg);
      setConversations(msg.newMessage);
    });
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return () => socket.off("privateMsg");
  }, [conversations, socket]);
  return (
    <div>
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        conversations.map((conversation) => (
          <MsgBoxes
            key={conversation._id}
            message={conversation}
            other={receiver}
          />
        ))
      )}
      {!loading && conversations.length < 1 && <MsgDefault />}
      <div ref={msgEndRef} />
    </div>
  );
};

export default Conversations;

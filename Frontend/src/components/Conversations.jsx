import React, { useRef } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import useConversationHook from "../Hooks/ConversationHook";
import MsgBoxes from "./MsgBoxes";
import MsgDefault from "./MsgDefault";
import { useSocketContext } from "../Context/SocketContext";
import audio from "../assets/chat-sound.mp3";
import { useNavigate } from "react-router-dom";

const Conversations = ({ receiver }) => {
  const navigate = useNavigate();
  const { loading, getConversation } = useConversationHook();
  const { conversations, setConversations } = useAuthContext();
  const { socket } = useSocketContext();
  const msgEndRef = useRef("");
  const chatAudio = new Audio(audio);

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
    if (!socket) {
      return navigate("/");
    }
    socket.on("privateMsg", (msg) => {
      if (msg) {
        setConversations([...conversations, msg.newMessage]);
      }
      //sound adding
      chatAudio.play();
    });
    socket.on("delivered", (d) => console.log("dele:", d));

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

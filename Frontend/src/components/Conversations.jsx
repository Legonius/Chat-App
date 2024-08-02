import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import useConversationHook from "../Hooks/ConversationHook";
import MsgBoxes from "./MsgBoxes";
import MsgDefault from "./MsgDefault";

const Conversations = ({ receiver }) => {
  const { loading, getConversation } = useConversationHook();
  const { conversations, setConversations } = useAuthContext();
  useEffect(() => {
    if (receiver._id) {
      const fetch = async (id) => {
        const result = await getConversation(id);
        console.log("conversation:", result);
        setConversations(result.data);
      };
      fetch(receiver._id);
    }
  }, [receiver]);
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
    </div>
  );
};

export default Conversations;

import React from "react";
import MsgSender from "./MsgSender";
import MsgUser from "./MsgUser";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import useConversationHook from "../Hooks/ConversationHook";

const Conversations = ({ receiver }) => {
  const { loading, getConversation } = useConversationHook();
  const [conversations, setConversations] = useState([]);
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
      {conversations.map((conversataion) => (
        <MsgSender
          key={conversataion._id}
          message={conversataion}
          other={receiver}
        />
      ))}
    </div>
  );
};

export default Conversations;

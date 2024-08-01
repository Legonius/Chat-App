import React from "react";
import MsgSender from "./MsgSender";
import MsgUser from "./MsgUser";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import useConversationHook from "../Hooks/ConversationHook";

const Conversations = ({ receiver }) => {
  console.log("receeiver:", receiver);
  const { loading, getConversation } = useConversationHook();
  useEffect(() => {
    // if (receiver._id) {
    const fetch = async (id) => {
      const result = await getConversation(id);
      console.log("conversation:", result);
    };
    fetch(receiver._id);
    // }
  }, [receiver._id]);
  return (
    <div>
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
  );
};

export default Conversations;

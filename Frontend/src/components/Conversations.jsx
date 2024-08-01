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
    const fetch = async () => {
      await getConversation(receiver._id);
      console.log("conversation:", fetch());
    };
    // }
  }, [receiver]);
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

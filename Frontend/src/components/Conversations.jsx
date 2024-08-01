import React from "react";
import MsgSender from "./MsgSender";
import MsgUser from "./MsgUser";
import { useState, useEffect } from "react";
import { useAuthContext } from "../Context/AuthContext";
import useConversationHook from "../Hooks/ConversationHook";

const Conversations = ({ receiver }) => {
  console.log("receeiver:", receiver);
  const { conversations: allMsg } = useAuthContext();
  const { loading, getConversation } = useConversationHook();
  useEffect(() => {
    const fetch = async () => {
      await getConversation(receiver._id);
      console.log(receiver._id);
      console.log(allMsg);
    };
    fetch();
  }, []);
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

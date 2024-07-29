import React from "react";
import MsgSender from "./MsgSender";
import MsgUser from "./MsgUser";
import { useState, useEffect } from "react";

const Conversations = ({ receiver }) => {
  useEffect(() => {
    console.log(receiver);
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

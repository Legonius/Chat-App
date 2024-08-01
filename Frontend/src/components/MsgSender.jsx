import React from "react";

const MsgSender = ({ message, other }) => {
  return (
    <div
      className={`chat ${
        message.receiverId === other._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            // src={
            //   message.avatar === "default"
            //     ? `/${message.gender}.jpeg`
            //     : `http://localhost:15000/public/images/${message.avatar}`
            // }
          />
        </div>
      </div>
      <div className="chat-bubble">{message.message}</div>
    </div>
  );
};

export default MsgSender;

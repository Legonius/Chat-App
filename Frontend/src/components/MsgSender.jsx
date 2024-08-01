import React from "react";

const MsgSender = ({ message, otherId }) => {
  return (
    <div
      className={`chat ${
        message.receiverId === otherId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className="chat-bubble">{message.message}</div>
    </div>
  );
};

export default MsgSender;

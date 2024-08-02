import React from "react";
import { useAuthContext } from "../Context/AuthContext";

const MsgBoxes = ({ message, other }) => {
  const { userData } = useAuthContext();

  const avatar = () => {
    let avatar;
    if (message.receiverId === other._id) {
      userData.avatar === "default"
        ? (avatar = `/${userData.gender}.jpeg`)
        : (avatar = `http://localhost:15000/public/images/${userData.avatar}`);
    } else {
      other.avatar === "default"
        ? (avatar = `/${other.gender}.jpeg`)
        : (avatar = `http://localhost:15000/public/images/${other.avatar}`);
    }
    return avatar;
  };

  return (
    <div
      className={`chat ${
        message.receiverId === other._id ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={avatar()} />
        </div>
      </div>
      <div
        className={`chat-bubble text-slate-50 ${
          message.receiverId === other._id ? "bg-blue-500" : ""
        }`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default MsgBoxes;

import React, { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

const MsgBoxes = ({ message, other }) => {
  const { userData } = useAuthContext();
  const currentDate = new Date(message.createdAt);
  const [showDate, setShowDate] = useState(false);

  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensures two digits
    const ampm = hours >= 12 ? "PM" : "AM";
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()]; // Get abbreviated day name

    // Convert 24-hour time to 12-hour time
    hours = hours % 12 || 12; // Adjusts 0 to 12 for midnight

    return `${dayOfWeek} ${day} ${month} At ${hours}:${minutes} ${ampm}`;
  }

  const avatar = () => {
    let avatar;
    if (message.receiverId === other._id) {
      userData.avatar === "default"
        ? (avatar = `/${userData.gender}.jpeg`)
        : (avatar = userData.avatar);
    } else {
      other.avatar === "default"
        ? (avatar = `/${other.gender}.jpeg`)
        : (avatar = other.avatar);
    }
    return avatar;
  };

  return (
    <div
      className={`chat ${
        message.receiverId === other._id ? "chat-end" : "chat-start"
      } `}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={avatar()} />
        </div>
      </div>
      {showDate && (
        <div className="chat-header">
          <time className="text-xs opacity-50 text-slate-600">
            {formatDate(currentDate)}
          </time>
        </div>
      )}
      <div
        onClick={() => setShowDate(!showDate)}
        className={`chat-bubble text-slate-50 ${
          message.receiverId === other._id ? "bg-blue-500" : ""
        } cursor-pointer`}
      >
        {message.message}
      </div>
    </div>
  );
};

export default MsgBoxes;

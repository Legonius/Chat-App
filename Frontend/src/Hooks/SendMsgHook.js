import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import sessionExpire from "../utils/sessionExpire";

const useSendMsgHook = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useAuthContext();

  const sendMsg = async (id, message) => {
    try {
      if (!message) return true;
      setLoading(true);
      const response = await fetch(`/api/msg/send/${id}`, {
        method: "post",
        credentials: "include",
        secure: false,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const msgData = await response.json();
      if (msgData.message === "session expired") {
        sessionExpire();
      }
      setConversations([...conversations, msgData.newMessage]);
      return msgData.success;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, setLoading, sendMsg };
};

export default useSendMsgHook;

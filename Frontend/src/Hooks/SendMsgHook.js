import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";

const useSendMsgHook = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations } = useAuthContext();

  const sendMsg = async (id, message) => {
    try {
      if (!message) return true;
      setLoading(true);
      const response = await fetch(
        `http://localhost:15000/api/msg/send/${id}`,
        {
          method: "post",
          credentials: "include",
          secure: false,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const msgData = await response.json();
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

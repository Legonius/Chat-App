import { useState } from "react";
import toast from "react-hot-toast";
import { VITE_SERVER_URL } from "../utils/constants";

const useConversationHook = () => {
  const [loading, setLoading] = useState(false);

  const getConversation = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(VITE_SERVER_URL + `/api/msg/${id}`, {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        return data;
      } else {
        if (data.message === "session expired") {
          localStorage.removeItem("chat-app-user");
          return toast.error("Session Expired");
        }
        toast.error("Can't get Conversations");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Conversation Loading Error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, getConversation };
};

export default useConversationHook;

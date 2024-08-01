import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const useConversationHook = () => {
  const { setConversations } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const getConversation = async (id) => {
    try {
      console.log("dive getConversation");
      setLoading(true);
      const response = await fetch(`http://localhost:15000/api/msg/${id}`, {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        return data;
      } else {
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

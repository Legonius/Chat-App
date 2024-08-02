import { useState } from "react";
import toast from "react-hot-toast";

const useConversationHook = () => {
  const [loading, setLoading] = useState(false);

  const getConversation = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:15000/api/msg/${id}`, {
        method: "get",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
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

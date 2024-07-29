import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const useConversationHook = () => {
  const { setConversations } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const getConversation = async (id) => {
    try {
      setLoading(true);
      const fetch = await fetch(`/api/msg/${id}`);
      const data = await fetch.json();
      setConversations(data);
    } catch (error) {
      console.log(error.message);
      toast.error("Conversation Loading Error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, setConversations };
};

export default useConversationHook;

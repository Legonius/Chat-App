import { useState } from "react";
import { msgSend } from "../../../Backend/controllers/msgController";

const useSendMsgHook = () => {
  const [loading, setLoading] = useState(false);

  const sendMsg = async (id, message) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:15000/api/msg/send/${id}`,
        {
          method: "post",
          credentials: "include",
          body: { message },
        }
      );
      const msgData = await response.json();
      console.log(msgData);
      return msgData;
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, msgSend };
};

export default useSendMsgHook;

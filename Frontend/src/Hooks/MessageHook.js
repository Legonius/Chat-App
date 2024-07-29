import { useState } from "react";
import toast from "react-hot-toast";

const useMessageHook = () => {
  const [loading, setLoading] = useState(false);

  const findFriend = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/findUser/${id}`);
      const data = await response.json();
      if (data.success) {
        return data;
      } else {
        toast.error("Something is wrong");
        return false;
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while fetching the user data");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, findFriend };
};

export default useMessageHook;

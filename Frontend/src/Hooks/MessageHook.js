import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useMessageHook = () => {
  const [loading, setLoading] = useState(false);
  const { allUserData } = useAuthContext();

  const findFriend = (id) => {
    try {
      setLoading(true);
      // const response = await fetch(
      //   `http://localhost:15000/api/user/findUser/${id}`,
      //   {
      //     method: "get",
      //     credentials: "include",
      //   }
      // );
      // const data = await response.json();
      const data = allUserData.filter((x) => id === x._id);
      if (data) {
        return data[0];
      } else {
        toast.error("Something is wrong");
        return false;
      }
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while fetching the user data");
      return false;
    }
  };

  return { setLoading, loading, findFriend };
};

export default useMessageHook;

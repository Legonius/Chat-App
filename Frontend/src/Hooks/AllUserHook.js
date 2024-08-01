import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useAllUserHook = () => {
  const [loading1, setLoading1] = useState(false);
  const { setAllUserData } = useAuthContext();

  const getUsers = async () => {
    try {
      setLoading1(true);
      const data = await fetch("http://localhost:15000/api/all-users", {
        method: "get",
        credentials: "include",
      });
      const allUsers = await data.json();
      if (!allUsers.success) {
        return toast.error("Users not found");
      }
      setAllUserData(allUsers.data);
      return allUsers.data;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading1(false);
    }
  };

  return { loading1, getUsers };
};

export default useAllUserHook;

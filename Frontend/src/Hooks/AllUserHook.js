import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const useAllUserHook = () => {
  const [loading1, setLoading1] = useState(false);
  const { setAllUserData } = useAuthContext();
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      setLoading1(true);
      const data = await fetch("/api/all-users", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        credentials: "include",
      });
      const allUsers = await data.json();
      if (!allUsers.success) {
        if (allUsers.message === "session expired") {
          localStorage.removeItem("chat-app-user");
          navigate("/");
          return toast.error("Session Expired");
        }
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

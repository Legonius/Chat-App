import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { VITE_SERVER_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setUserData, userData } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const { setAllUserData } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      if (!userData) {
        localStorage.removeItem("chat-app-user");
        navigate("/");
        return toast.error("You're not loggin!");
      }
      const response = await fetch(VITE_SERVER_URL + "/api/user/logout", {
        method: "get",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("chat-app-user");
        setUserData(null);
        setAllUserData([]);
        toast.success("Logout Seccessfully.");
      }
    } catch (error) {
      toast.error("Can't Logout,try again.");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;

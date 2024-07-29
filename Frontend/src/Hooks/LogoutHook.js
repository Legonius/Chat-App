import { useState } from "react";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const { setUserData, userData } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      if (!userData) {
        return toast.error("You're not loggin!");
      }
      const response = await fetch("/api/user/logout");
      const data = await response.json();
      if (data.success) {
        // localStorage.removeItem("chat-app-user");
        setUserData(null);
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

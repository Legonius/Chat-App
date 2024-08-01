import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext.jsx";

const inputErrorHandling = (email, password) => {
  if (!email || !password) {
    toast.error("All fields required", {
      duration: 3000,
      position: "top-center",
    });
    return true;
  } else false;
};

const useSigninHook = () => {
  const [loading, setLoading] = useState(false);
  const { setUserData } = useAuthContext();

  const signIn = async (email, password) => {
    const err = inputErrorHandling(email, password);
    if (err) return;
    const data = JSON.stringify({ email, password });
    try {
      setLoading(true);
      const response = await fetch("http://localhost:15000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
        credentials: "include", // Include credentials in the request
      });
      const getUserData = await response.json();
      console.log("getUserData:", getUserData);

      if (!getUserData.success) {
        return toast.error(getUserData.message);
      } else {
        toast.success("Login Successfully!");
        // localStorage.setItem("chat-app-user", JSON.stringify(getUserData.data));
        setUserData(getUserData.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signIn };
};

export default useSigninHook;
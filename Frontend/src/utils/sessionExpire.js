import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const sessionExpire = () => {
  const navigate = useNavigate();
  localStorage.removeItem("chat-app-user");
  navigate("/");
  return toast.error("Session Expired");
};

export default sessionExpire;

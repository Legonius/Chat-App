import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext.jsx";
import useSigninHook from "./SigninHook.js";

const handleError = ({
  username,
  email,
  password,
  confirmPassword,
  age,
  gender,
}) => {
  if (!username || !email || !password || !confirmPassword || !age || !gender) {
    toast.error("Required all Field", {
      duration: 4000,
      position: "top-center",
    });
    return true;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match", {
      duration: 4000,
      position: "top-center",
    });
    return true;
  }
  return false;
};

export const useSignup = () => {
  const { signIn } = useSigninHook();
  const [loading, setLoading] = useState(false);
  const { setUserData } = useAuthContext();
  const signup = async (userForm, setUserForm) => {
    const { username, email, password, confirmPassword, age, gender, avatar } =
      userForm;
    const err = handleError({
      username,
      email,
      password,
      confirmPassword,
      age,
      gender,
      avatar,
    });
    if (err) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("avatar", avatar);
      const response = await fetch("http://localhost:15000/api/user/signup", {
        method: "post",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });
      const user = await response.json();
      if (!user.success) {
        return toast.error(user.message);
      }
      console.log(user);
      if (user._id) {
        signIn(email, password);
        setUserForm({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          age: "",
          gender: "Male",
          avatar: "",
        });
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};
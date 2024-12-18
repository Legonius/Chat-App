import { useEffect } from "react";
import AllUsers from "../components/AllUsers";
import useLogout from "../Hooks/LogoutHook.js";
import useAllUserHook from "../Hooks/AllUserHook.js";
import { useAuthContext } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, logout } = useLogout();
  const { loading1, getUsers } = useAllUserHook();
  const { allUserData, userData } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (allUserData.length < 1) {
      getUsers();
    }
    if (!userData) {
      navigate("/");
    }
  }, []);

  return (
    <div className="overflow-y-scroll w-full h-full pt-10">
      <div
        onClick={logout}
        className="z-30 absolute right-3 top-3 text-white underline cursor-pointer"
      >
        <span
          className={` text-[11px] ${loading ? "loading loading-spinner" : ""}`}
        >
          Sign out
        </span>
      </div>
      {allUserData?.map((user) => {
        return <AllUsers key={user._id} data={user} />;
      })}
    </div>
  );
};

export default Login;

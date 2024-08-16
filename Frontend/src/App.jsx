import Login from "./pages/Login";
import Message from "./pages/Message";
import Signin from "./pages/Signin";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  // console.log(import.meta.env.VITE_SERVER_URL);
  const { userData } = useAuthContext();

  return (
    <div
      className=" overflow-x-scroll flex justify-center items-center h-screen
 bg-slate-800"
    >
      <div className="w-full h-full relative bg-gray-300 md:rounded-lg p-4 flex flex-none flex-col justify-center items-center md:h-[90%] md:max-w-[450px]">
        <div className="z-20 absolute w-full top-0 left-0 h-12 bg-slate-400 md:bg-slate-600 md:rounded-t-lg text-slate-50 font-extrabold text-xl flex items-center justify-start gap-2 px-2">
          Watt's<span className="text-blue-500">Chatt</span>
        </div>
        <Routes>
          <Route
            path="/"
            element={userData ? <Navigate to={"/login"} /> : <Signin />}
          />
          <Route
            path="/login"
            element={userData ? <Login /> : <Navigate to={"/"} />}
          />
          <Route path="/msg/:oppositeChatId" element={<Message />} />
          <Route
            path="/signup"
            element={userData ? <Navigate to={"/"} /> : <Signup />}
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;

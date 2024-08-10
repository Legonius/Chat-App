import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [getOnlineUsers, setOnlineUsers] = useState();
  const { userData } = useAuthContext();
  useEffect(() => {
    if (userData) {
      const socket = io("http://localhost:15000");
      setSocket(socket);
      socket.on("connect", () => console.log("connected:", socket.id));
      return () => {
        socket.off("disconnect", () => console.log("disconnected:", socket.id));
        socket.disconnect();
      };
    } else {
      setSocket(null);
    }
  }, [userData]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketContextProvider;

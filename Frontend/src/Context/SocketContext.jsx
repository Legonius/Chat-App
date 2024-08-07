import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userData } = useAuthContext();
  useEffect(() => {
    if (userData) {
      const socket = io("http://localhost:15000");
      setSocket(socket);
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

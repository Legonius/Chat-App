import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; // socket v ^2.2.0
import { useAuthContext } from "./AuthContext";

export const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [allOnlineUsers, setOnlineUsers] = useState({});
  const { userData } = useAuthContext();
  useEffect(() => {
    if (userData) {
      const socketInstance = io("http://192.168.100.171:15000", {
        withCredentials: true,
        query: { userId: userData.id },
      });
      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });

      // Cleanup when the component unmounts or when userData changes
      return () => {
        socketInstance.off("getOnlineUsers"); // Remove specific listener
        socketInstance.disconnect(); // Disconnect the socket
      };
    } else {
      setSocket(null);
    }
  }, [userData]);

  return (
    <socketContext.Provider value={{ socket, allOnlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketContextProvider;

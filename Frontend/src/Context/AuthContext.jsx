import { createContext, useContext, useState } from "react";

export const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

export default function ContextProvider({ children }) {
  let recentUser = JSON.parse(localStorage.getItem("chat-app-user"));
  const [userData, setUserData] = useState(recentUser || null);
  const [allUserData, setAllUserData] = useState([]);
  const [conversations, setConversations] = useState([]);
  return (
    <authContext.Provider
      value={{
        setUserData,
        userData,
        allUserData,
        setAllUserData,
        conversations,
        setConversations,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

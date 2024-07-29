import { createContext, useContext, useState } from "react";

export const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

export default function ContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [allUserData, setAllUserData] = useState([]);
  return (
    <authContext.Provider
      value={{ setUserData, userData, allUserData, setAllUserData }}
    >
      {children}
    </authContext.Provider>
  );
}

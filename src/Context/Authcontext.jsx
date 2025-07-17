import { useState, useEffect, createContext, useContext } from "react";
import  { jwtDecode } from 'jwt-decode'



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user,Setuser]=useState(null)
  


  
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      const decode=jwtDecode(savedToken)
      console.log("userdateails",decode);
      Setuser(decode)
    }
  }, []);


  return (
    <AuthContext.Provider value={{user, token, setToken, Setuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import axios from "axios";
import Cookies from "js-cookie";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface ProviderProps {
  children: ReactNode;
}
export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    return storedAuthState ? JSON.parse(storedAuthState) : false;
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/logout",
        {},
        { withCredentials: true }
      );
      Cookies.remove("Authorization");
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

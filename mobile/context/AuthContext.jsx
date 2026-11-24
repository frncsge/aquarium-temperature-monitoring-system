import { useEffect, useState, createContext, useContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const savedToken = await SecureStore.getItemAsync("accessToken");
        if (savedToken) setToken(savedToken);
      } catch (error) {
        console.error("Failed to load token:", error);
      } finally {
        setAuthLoading(false);
      }
    };

    loadToken();
  }, []);

  const signIn = async (accessToken, userData) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    setToken(accessToken);
    setUser(userData);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, authLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

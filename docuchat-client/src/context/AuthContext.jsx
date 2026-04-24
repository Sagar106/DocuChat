import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../api/auth.api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      await loginUser(data);

      const res = await getCurrentUser();

      setUser(res.data.user);
    } catch (error) {
      console.log("Login failed", error);

      setError(error.response?.data?.message || "Login failed");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();

      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);

      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data?.user) {
        setUser(res.data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

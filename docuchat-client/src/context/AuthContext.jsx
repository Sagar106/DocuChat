import { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../api/auth.api";

const AuthContext = createContext();

export const useAuth = () => {
  useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const login = async (data) => {
    try {
      setLoading(true);

      await loginUser(data);

      const res = await getCurrentUser();

      setUser(res.data.user);
    } catch (error) {
      console.log("Login failed", err);

      setError(err.response?.data?.message || "Login failed");

      setUser(null);
    } finally {
      loading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      setUser(null);
    } catch (error) {
      console.error("Logout failed", err);

      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
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

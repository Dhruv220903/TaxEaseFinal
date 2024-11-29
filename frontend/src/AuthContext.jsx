import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Login Function
  const login = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signin", data, {
        withCredentials: true,
      });
      if (response.data.success) {
        setIsAuthenticated(true);
        await fetchUser(); // Ensure fetchUser completes before proceeding
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  // Signup Function
  const signup = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", data, {
        withCredentials: true,
      });
      if (response.data.success) {
        await login(data);
      }
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signout", {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  // Fetch User Information
  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/user/detail", {
        withCredentials: true,
      });
      if (response.data?.data) {
        setUser(response.data.data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      console.error("Fetching user info failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Check Authentication Status on Component Mount
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);

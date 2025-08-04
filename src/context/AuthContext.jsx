/*import React, { createContext, useState, useContext } from "react";

// Create the Auth context
const AuthContext = createContext();

// Provider component to wrap around your app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Called on login/signup success
  const login = (userData) => {
    setUser(userData);
  };

  // Called on logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access auth context easily
export function useAuth() {
  return useContext(AuthContext);
}
*/

/*import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, check if token & user info are in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Login saves user info & token
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout clears storage & user state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
*/
// src/context/AuthContext.jsx
/*import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth as useAuthHook } from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { login, signup, loading, error } = useAuthHook();

  const [user, setUser] = useState(null);

  // On app load, check if token exists and user info saved
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (credentials) => {
    await login(credentials, (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    });
  };

  const handleSignup = async (data) => {
    await signup(data, (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login: handleLogin, signup: handleSignup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context easily
export const useAuth = () => useContext(AuthContext); */
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On app load, check if token and user info exist in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


import React, { createContext, useState } from "react";
import { CONSTANTS } from "../utils/staticData";
import axiosInstance from "../api/axios";

interface User {
  id?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  phone_verified?: 0 | 1 | boolean;
  email_verified?: 0 | 1 | boolean;
  alt_email?: string;
  alt_phone?: string;
  alt_phone_code?: string;
  // Add other user properties
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean; // 🔴 NEW
  login: (user?: User) => void;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void; // 🔴 NEW - to update user later
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(CONSTANTS.USER_INFO);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check if user is authenticated on mount
    return localStorage.getItem(CONSTANTS.IS_AUTHENTICATED) === "true";
  });

  const login = (user?: User) => {
    // Set authentication flag
    localStorage.setItem(CONSTANTS.IS_AUTHENTICATED, "true");
    setIsAuthenticated(true);

    // Store user if provided
    if (user) {
      localStorage.setItem(CONSTANTS.USER_INFO, JSON.stringify(user));
      setUser(user);
    }
  };

  const logout = async () => {
    try {
      // Call backend to clear cookie
      await axiosInstance.post("/auth/logout/");
      console.log("✅ Logged out successfully");
    } catch (error) {
      console.error("❌ Logout error:", error);
    } finally {
      // Clear local state regardless of API result
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

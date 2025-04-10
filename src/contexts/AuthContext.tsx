
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("hms_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("hms_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to the backend
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Demo credentials check
      if (email === "admin@hospital.com" && password === "password") {
        const user = {
          id: "1",
          name: "Admin User",
          email: "admin@hospital.com",
          role: "admin"
        };
        setUser(user);
        localStorage.setItem("hms_user", JSON.stringify(user));
        toast.success("Login successful!");
        return true;
      } else if (email === "doctor@hospital.com" && password === "password") {
        const user = {
          id: "2",
          name: "Doctor User",
          email: "doctor@hospital.com",
          role: "doctor"
        };
        setUser(user);
        localStorage.setItem("hms_user", JSON.stringify(user));
        toast.success("Login successful!");
        return true;
      } else if (email === "nurse@hospital.com" && password === "password") {
        const user = {
          id: "3",
          name: "Nurse User",
          email: "nurse@hospital.com",
          role: "nurse"
        };
        setUser(user);
        localStorage.setItem("hms_user", JSON.stringify(user));
        toast.success("Login successful!");
        return true;
      }
      
      toast.error("Invalid email or password");
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("hms_user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

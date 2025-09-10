"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isMockAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMockAuth, setIsMockAuth] = useState(false);

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const handleMockAuth = () => {
    try {
      const mockUserData = localStorage.getItem("mock_user_data");
      if (mockUserData) {
        const userData = JSON.parse(mockUserData);
        setUser(userData);
        setIsMockAuth(true);
      }
    } catch (error) {
      console.error("Failed to load mock user data:", error);
      Cookies.remove("auth_token");
      localStorage.removeItem("mock_user_data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = useCallback(
    async (token: string) => {
      try {
        const response = await axios.get(`${strapiUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        });
        setUser(response.data.user);
        setIsMockAuth(false);
      } catch (error) {
        const err = error as { message?: string };
        console.warn("Failed to fetch user from Strapi:", err.message);
        if (token.startsWith("mock-jwt-")) {
          handleMockAuth();
          return;
        }
        Cookies.remove("auth_token");
      } finally {
        setIsLoading(false);
      }
    },
    [strapiUrl]
  );

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      if (token.startsWith("mock-jwt-")) {
        handleMockAuth();
      } else {
        fetchUser(token);
      }
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const login = (token: string) => {
    Cookies.set("auth_token", token, {
      expires: 30,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    if (token.startsWith("mock-jwt-")) {
      handleMockAuth();
    } else {
      fetchUser(token);
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("mock_user_data");
    setUser(null);
    setIsMockAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        isMockAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

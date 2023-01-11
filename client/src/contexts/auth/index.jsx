import { Center, Spinner } from "@chakra-ui/react";
import { useCallback } from "react";
import { useEffect, useContext, createContext, useState } from "react";
import { API_BASE_URL } from "../../utils/consts";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const getMe = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const value = {
    user,
    ready,
    logout: async () => {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setUser(null);
    },
    login: async (email, password) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setUser(data);
    },
    register: async (username, email, password) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setUser(data);
    },
    editProfile: async (name, bio, picture) => {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, bio, picture }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setUser(data);
    },
  };
  return (
    <AuthContext.Provider value={value}>
      {ready ? (
        children
      ) : (
        <Center height="100vh" width="100vw" backgroundColor="gray.50">
          <Spinner />
        </Center>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

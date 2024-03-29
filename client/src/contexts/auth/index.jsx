import { Center, Spinner } from "@chakra-ui/react";
import { useEffect, useContext, createContext, useState } from "react";
import { API_BASE_URL } from "../../utils/consts";
import { useGoogleLogin } from "@react-oauth/google";

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
    login: async (emailOrUsername, password) => {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
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
    googleAuth: useGoogleLogin({
      flow: "auth-code",
      onSuccess: async (response) => {
        const { code } = response;
        const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setUser(data);
      },
      onError: (error) => {
        console.log(error);
      },
      auto_select: true,
    }),
    editProfile: async (username, name, bio, picture) => {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, name, bio, picture }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
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

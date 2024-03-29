import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const Protected = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

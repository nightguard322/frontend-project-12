import { useAuthStore } from "../features/auth/useAuthStore"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import LoginPage from "../features/auth/Components/Login";

export const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  if (!token) {
    return <LoginPage />; // синхронный рендер логина
  }

  return children;
};

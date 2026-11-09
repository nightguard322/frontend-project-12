import { useAuthStore } from "../features/auth/useAuthStore"
import { Navigate } from "react-router-dom"

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

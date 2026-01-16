import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth(); // 🔴 Use isAuthenticated instead

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

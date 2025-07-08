import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ role, children }) {
  const user = useSelector((s) => s.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
}

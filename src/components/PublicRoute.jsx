import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader/>;

  return user ? <Navigate to="/admin" /> : children;
};

export default PublicRoute;

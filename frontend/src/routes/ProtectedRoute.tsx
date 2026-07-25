import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import PageLoader from "../components/ui/PageLoader";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

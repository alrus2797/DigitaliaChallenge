import { PropsWithChildren, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children as ReactElement;

}
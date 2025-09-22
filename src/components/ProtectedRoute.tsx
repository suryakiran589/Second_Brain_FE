import type {  ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/authContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth =useAuth()
  if (!auth) {
  throw new Error("useAuth must be used inside AuthProvider");
}
  const {token} = auth

  return token ? children : <Navigate to="/login" />;
}

import { Navigate } from "react-router-dom";
import { useAlert } from "../utils/AlertContext";
import { ProtectedRouteProps } from "./ProtectedRoute.type";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwtPayload";
import React from "react";


export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { showAlert } = useAlert();
  const token = localStorage.getItem('token');

  try {
    const decoded = jwtDecode<JwtPayload>(token ?? "");
    if (decoded.role !== "admin") {
      showAlert("Access Denied. Admins only.", "error");
      return <Navigate to="/" />;
    }
  } catch (error) {
    showAlert("Invalid session. Access Denied.", "error");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

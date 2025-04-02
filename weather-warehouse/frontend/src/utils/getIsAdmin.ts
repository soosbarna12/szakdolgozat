import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwtPayload";


export function getIsAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.role === 'admin';
    } catch {
      return false;
    }
  }
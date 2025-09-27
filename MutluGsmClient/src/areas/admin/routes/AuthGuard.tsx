import { Navigate, Outlet, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";

type Jwt = { exp?: number };

export function AuthGuard() {
  const token = localStorage.getItem("response");
  const location = useLocation();

  if (!token) {
    return <Navigate to="login" replace state={{ from: location }} />;
  }

  try {
    const d = jwtDecode<Jwt>(token);

    const now = new Date().getTime() / 1000;

    if (!d.exp || d.exp < now) {
      return <Navigate to="login" replace state={{ from: location }} />;
    }

    return <Outlet />;
  } catch {
    return <Navigate to="login" replace state={{ from: location }} />;
  }
}

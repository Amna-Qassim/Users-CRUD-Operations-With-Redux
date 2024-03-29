import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  let token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" />;
};

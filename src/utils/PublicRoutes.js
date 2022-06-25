import { Outlet, Navigate } from "react-router-dom";

export const PublicRoutes = () => {
  let token = localStorage.getItem("token");

  return !token ? <Outlet /> : <Navigate to="/users" />;
};

import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  let token = JSON.parse(localStorage.getItem("token"));

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

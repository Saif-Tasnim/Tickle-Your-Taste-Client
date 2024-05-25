import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingPage from "../component/LoadingPage/LoadingPage";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LoadingPage />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/"} state={{ from: location }} replace />;
};

export default PrivateRoutes;

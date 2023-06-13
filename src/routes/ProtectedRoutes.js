import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({
  component: Component,
  fallBbackPath,
  isAllowed,
}) => {
  if (!isAllowed) {
    return <Navigate to={fallBbackPath} />;
  }
  return <Component />;
};

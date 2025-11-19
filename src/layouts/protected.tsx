import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default Protected;

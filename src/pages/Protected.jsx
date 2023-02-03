import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import { shallow } from "zustand/shallow";

function Protected({ children, publicRoute }) {
  const { isSignedIn } = useAuthStore(
    (state) => ({ isSignedIn: state.isSignedIn }),
    shallow
  );

  if (isSignedIn && publicRoute) {
    return <Navigate to="/" replace />;
  }

  if (!isSignedIn && !publicRoute) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
export default Protected;

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

// eslint-disable-next-line react/prop-types
export default function Private({ children }) {
  const { signed, loading } = useContext(AuthContext);
  if (loading) {
    return <div></div>;
  }
  if (!signed) {
    return <Navigate to="/" />;
  }
  return children;
}

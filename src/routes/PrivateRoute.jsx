import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user , loading } = useContext(AuthContext);
  const location = useLocation;

  if(loading){
    return <Loading/>;

  }

  if(user && user?.email){
    return children;
  }

  return user ? children : <Navigate to="auth/signin" state ={{ from : location}} replace />;
};

export default PrivateRoute;

// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

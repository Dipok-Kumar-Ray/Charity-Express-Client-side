import React from 'react';
import useAuth from '../hooks/useAuth';
import UseUserRole from '../../RoleManage/UseUserRole';
import { Navigate } from 'react-router';

const AdminSecure = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = UseUserRole();

  console.log("user:", user);
  console.log("loading:", loading);
  console.log("role:", role);
  console.log("roleLoading:", roleLoading);

  if (loading || roleLoading) {
    return <p>Loading...</p>;
  }

  if (!user || role?.toLowerCase().trim() !== "admin") {
    return <Navigate to="/forbidden" />;
  }

  return children;
};

export default AdminSecure;

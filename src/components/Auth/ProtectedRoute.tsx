import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../Dashboard/LoadingSpinner';

const ProtectedRoute: React.FC = () => {
  const { authState } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (authState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner message="Checking authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!authState.user) {
    // Save the location they were trying to go to for a redirect after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
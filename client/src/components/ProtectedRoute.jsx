import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { token, user } = useAppContext();

    // If no token or user, redirect to login
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the protected component
    return children;
};

export default ProtectedRoute;
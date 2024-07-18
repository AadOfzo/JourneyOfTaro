import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ element, isLoggedIn, ...rest }) => {
    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default PrivateRoutes;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Login from '../../components/login/Login';
import Dashboard from '../../pages/admin/Dashboard';
import ImageRequestPage from '../../pages/imageRequest/ImageRequestPage';
import { useAuth } from '../../components/authentication/Auth';
import UserProfile from "../../components/lists/UserProfile";

const AppRoutes = () => {
    const { token } = useAuth();
    const isLoggedIn = !!token;

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/user-profile/:userId"
                element={<PrivateRoutes isLoggedIn={isLoggedIn} element={<UserProfile />} />}
            />
            {/*<Route*/}
            {/*    path="/dashboard"*/}
            {/*    element={<PrivateRoutes isLoggedIn={isLoggedIn} element={<Dashboard />} />}*/}
            {/*/>*/}
            <Route
                path="/imageRequestPage"
                element={<PrivateRoutes isLoggedIn={isLoggedIn} element={<ImageRequestPage />} />}
            />
            {/*<Route*/}
            {/*    path="/"*/}
            {/*    element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />}*/}
            {/*/>*/}
        </Routes>
    );
};

export default AppRoutes;

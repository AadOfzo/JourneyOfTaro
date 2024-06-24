import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Login from '../../components/login/Login';
import Dashboard from '../../pages/admin/Dashboard';
import ImageRequestPage from '../../pages/imageRequest/ImageRequestPage';

const AppRoutes = ({ isLoggedIn }) => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
                <PrivateRoutes isLoggedIn={isLoggedIn} element={<Dashboard />} />
            } />
            <Route path="/imageRequestPage" element={
                <PrivateRoutes isLoggedIn={isLoggedIn} element={<ImageRequestPage />} />
            } />
            <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        </Routes>
    );
};

export default AppRoutes;

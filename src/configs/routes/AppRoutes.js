import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Login from '../../components/login/Login';
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
            <Route
                path="/imageRequestPage"
                element={<PrivateRoutes isLoggedIn={isLoggedIn} element={<ImageRequestPage />} />}
            />
        </Routes>
    );
};

export default AppRoutes;

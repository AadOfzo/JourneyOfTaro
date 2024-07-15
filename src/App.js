// App.js
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from "./components/authentication/Auth";
import NavBar2 from './components/NavBar2/NavBar2';
import FooterMenu from './components/footer/FooterMenu';
import PageRoutes from './configs/routes/PageRoutes';
import ComponentRoutes from './configs/routes/ComponentRoutes';
import AppRoutes from './configs/routes/AppRoutes';
import { handleLogout } from "./configs/utilities/AuthorisationUtilities";
import ApiService from "./configs/utilities/axios/ApiService";

function App() {
    const { user, token, login, logout } = useAuth(); // Access user, token, login, and logout from useAuth
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('visitor'); // Default role is visitor

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (token) {
                    const userDetails = await ApiService.fetchUserDetails();
                    setUserName(userDetails.username);
                    setUserRole(userDetails.role);
                } else {
                    setUserName('');
                    setUserRole('visitor');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <div className="main-outer-container">
            <NavBar2
                isLoggedIn={!!token}
                userRole={userRole}
                handleLogout={() => handleLogout(setUserName, setUserRole)}
            />
            <div className="main-content-container">
                <Routes>
                    <Route path="/*" element={<PageRoutes />} />
                    <Route path="/*" element={<ComponentRoutes />} />
                    <Route path="/*" element={<AppRoutes isLoggedIn={!!token} userRole={userRole} />} />
                </Routes>
            </div>
            <footer className="main-footer">
                <FooterMenu isLoggedIn={!!token} userName={userName} />
            </footer>
        </div>
    );
}

export default () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

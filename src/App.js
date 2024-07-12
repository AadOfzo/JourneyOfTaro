import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar2 from './components/NavBar2/NavBar2';
import FooterMenu from './components/footer/FooterMenu';
import UserManagement from '../src/components/authentication/UserManagement'
import { handleLogout } from './configs/utilities/AuthorisationUtilities';
import PageRoutes from './configs/routes/PageRoutes';
import ComponentRoutes from './configs/routes/ComponentRoutes';
import AppRoutes from './configs/routes/AppRoutes';
import ErrorBoundary from "./errors/ErrorBoundary";
import ApiService from "./configs/utilities/axios/ApiService";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('visitor'); // Default role is visitor

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await fetchUserDetails(token);
                    setIsLoggedIn(true);
                } else {
                    setUserName('');
                    setUserRole('visitor');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setUserName('');
                setUserRole('visitor');
                setIsLoggedIn(false);
            }
        };

        fetchUserData();
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const userData = await ApiService.fetchUserDetails(token);
            setUserName(userData.username);
            setUserRole(userData.role);
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    };

    return (
        <div className="main-outer-container">
            <NavBar2
                isLoggedIn={isLoggedIn}
                userRole={userRole}
                handleLogout={() => handleLogout(setIsLoggedIn, setUserName, setUserRole)}
            />
            <div className="main-content-container">
                <ErrorBoundary>
                    <Routes>
                        <Route path="/*" element={<PageRoutes />} />
                        <Route path="/*" element={<ComponentRoutes />} />
                        <Route path="/*" element={<AppRoutes isLoggedIn={isLoggedIn} userRole={userRole} />} />
                    </Routes>
                </ErrorBoundary>
                {userRole === 'ROLE_ADMIN' && <UserManagement userRole={userRole} />}
            </div>
            <footer className="main-footer">
                <FooterMenu isLoggedIn={isLoggedIn} userName={userName} />
            </footer>
            {/*{!isLoggedIn && <PopupContainer />}*/}
        </div>
    );
}

export default App;

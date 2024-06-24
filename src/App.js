import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar2 from './components/NavBar2/NavBar2';
import FooterMenu from './components/footer/FooterMenu';
import { fetchUserDetails, handleLogout } from './configs/utilities/AuthorisationUtilities';
import PageRoutes from './configs/routes/PageRoutes';
import ComponentRoutes from './configs/routes/ComponentRoutes';
import AppRoutes from './configs/routes/AppRoutes';
import PopupContainer from "./components/popup/PopupContainer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('visitor'); // Default role is visitor

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserData = async () => {
            try {
                if (token) {
                    const userDetails = await fetchUserDetails(token, setUserName, setUserRole);
                    setIsLoggedIn(true);
                } else {
                    setUserName('');
                    setUserRole('visitor');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="main-outer-container">
            <NavBar2 isLoggedIn={isLoggedIn} handleLogout={() => handleLogout(setIsLoggedIn, setUserName, setUserRole)} />
            <div className="main-content-container">
                <Routes>
                    <Route path="/*" element={<PageRoutes />} />
                    <Route path="/*" element={<ComponentRoutes />} />
                    <Route path="/*" element={<AppRoutes isLoggedIn={isLoggedIn} userRole={userRole} />} />
                </Routes>
            </div>
            <footer className="main-footer">
                <FooterMenu isLoggedIn={isLoggedIn} userName={userName} />
            </footer>
            {!isLoggedIn && <PopupContainer />}
        </div>
    );
}

export default App;

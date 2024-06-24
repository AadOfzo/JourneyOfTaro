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

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        const fetchUserData = async () => {
            try {
                if (isLoggedIn && token) {
                    const userDetails = await fetchUserDetails(token);
                    setUserName(userDetails.username);
                } else {
                    setUserName('');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserData();
    }, [isLoggedIn]);

    return (
        <div className="main-outer-container">
            <NavBar2 isLoggedIn={isLoggedIn} handleLogout={() => handleLogout(setIsLoggedIn, setUserName)} />
            <div className="start-button-container">
                {/*<StartButtonComponent onClick={handleStartClick} />*/}
            </div>

            <div className="main-content-container">
                <Routes>
                    <Route path="/*" element={<PageRoutes />} />
                    <Route path="/*" element={<ComponentRoutes />} />
                    <Route path="/*" element={<AppRoutes isLoggedIn={isLoggedIn} />} />
                </Routes>
            </div>
            <footer className="main-footer">
                <FooterMenu isLoggedIn={isLoggedIn} userName={userName} />
            </footer>
            <PopupContainer />
        </div>
    );
}

export default App;

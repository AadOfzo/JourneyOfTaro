import React, { useRef, useState, useEffect } from 'react';
import SnavBar2 from './styles.navBar2';
import { NavLink } from 'react-router-dom';
import LoginPopupMainComponent from "../login/LoginPopupMainComponent";
import NavBarDropdown from "./NavBarDropdown";

function NavBar2({ handleLogout }) {
    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage user's login status
    const [showLogin, setShowLogin] = useState(false); // State to control login popup visibility

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Function to toggle login status
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    // Function to handle logout
    const handleLogoutClick = () => {
        handleLogout(); // Call the handleLogout function passed as a prop
        setIsLoggedIn(false); // Update isLoggedIn state
    };

    // Check if user is logged in based on token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
    }, []);

    // Function to open login popup
    const handleOpenLogin = () => {
        setShowLogin(true);
    };

    // Function to close login popup
    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <SnavBar2 ref={navRef} className={`${isNavOpen ? 'open' : ''}`}>
            <div className="nav-container">
                <div className="navbar-title">Journey of Taro</div>
                <div className={`menu ${isNavOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/images"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                ImagePage
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                            to="/signup"
                            className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                            Start Tour
                            </NavLink>
                        </li>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/music"
                                        className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                        Music
                                    </NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogoutClick}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <NavBarDropdown isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                </div>
                <div className="hamburger" onClick={toggleNav}>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                </div>
            </div>
            {/*<LoginPopupMainComponent*/}
            {/*    show={showLogin}*/}
            {/*    onClose={handleCloseLogin}*/}
            {/*    handleLogin={handleLogin}*/}
            {/*/>*/}
        </SnavBar2>
    );
}

export default NavBar2;

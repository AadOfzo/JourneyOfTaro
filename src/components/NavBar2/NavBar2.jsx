import React, { useRef, useState, useEffect } from 'react';
import SnavBar2 from './styles.navBar2';
import { NavLink } from 'react-router-dom';
import LoginPopupMainComponent from "../login/LoginPopupMainComponent";

function NavBar2() {
    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage user's login status

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    // Function to toggle login status
    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    // Check if user is logged in based on token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
    }, []);

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
                                to="/postRequestPage"
                                className={({isActive}) => (isActive ? 'active-link' : 'default-link')}>
                                PostRequest
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/getRequestPage"
                                className={({isActive}) => (isActive ? 'active-link' : 'default-link')}>
                                GetRequest
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/imageRequestPage"
                                className={({isActive}) => (isActive ? 'active-link' : 'default-link')}>
                                ImageRequest
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/images"
                                className={({isActive}) => (isActive ? 'active-link' : 'default-link')}>
                                ImagePage
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                className={({isActive}) => (isActive ? 'active-link' : 'default-link')}>
                                Login
                            </NavLink>
                        </li>
                        {isLoggedIn && (
                            // Render these links only if the user is logged in
                            <>
                                <li>
                                    <NavLink
                                        to="/music"
                                        className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                        Music
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/samples"
                                        className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                        Samples
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/upload"
                                        className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                        Demo Upload
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {!isLoggedIn && (
                            // Render login link if the user is not logged in
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <a href="/contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="hamburger" onClick={toggleNav}>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                </div>
            </div>
            <LoginPopupMainComponent isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
        </SnavBar2>
    );
}

export default NavBar2;

import React, { useRef, useState, useEffect } from 'react';
import SnavBar2 from './styles.navBar2';
import { NavLink } from 'react-router-dom';
import NavBarDropdown from "./NavBarDropdown";
import { useAuth } from '../authentication/Auth';

function NavBar2() {
    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { user, logout } = useAuth(); // Destructure `user` and `logout` from useAuth

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <SnavBar2 ref={navRef} className={`${isNavOpen ? 'open' : ''}`}>
            <div className="nav-container">
                <div className="navbar-title">Journey of Taro</div>
                <div className={`menu ${isNavOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                Start Tour
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/images" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                Images
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/music" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                Music
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                Admin Dashboard
                            </NavLink>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                        About
                                    </NavLink>
                                </li>
                                {user.role === 'ADMIN' && (
                                    <li>
                                        <NavLink to="/unused" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                            Unused Components
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <NavBarDropdown isLoggedIn={!!user} handleLogout={handleLogout} />
                </div>
                <div className="hamburger" onClick={toggleNav}>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                </div>
            </div>
        </SnavBar2>
    );
}

export default NavBar2;

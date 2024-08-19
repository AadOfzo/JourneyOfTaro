import React, { useRef, useState } from 'react';
import SnavBar2 from './styles.navBar2';
import { NavLink } from 'react-router-dom';
import NavBarDropdown from "./NavBarDropdown";
import { useAuth } from '../authentication/Auth';

function NavBar2({ isLoggedIn }) {
    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleLogout = () => {
        logout();
    };

    // Debug logging
    console.log('User:', user);

    // Check if user roles include 'ADMIN'
    const isAdmin = user && user.roles && user.roles.includes('ROLE_ADMIN');

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

                        {user ? (
                            <>
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
                                    <NavLink to="/unused" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                        Unused Components
                                    </NavLink>
                                </li>
                                {isAdmin && (
                                    <li>
                                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                            Admin Dashboard
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <button onClick={handleLogout} className="logout-button">Logout</button>
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
                    <NavBarDropdown isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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

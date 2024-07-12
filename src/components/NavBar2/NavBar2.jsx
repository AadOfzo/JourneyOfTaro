import React, { useRef, useState, useEffect } from 'react';
import SnavBar2 from './styles.navBar2';
import { NavLink } from 'react-router-dom';
import NavBarDropdown from "./NavBarDropdown";

function NavBar2({ isLoggedIn, userRole, handleLogout }) {
    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
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
                        {isLoggedIn && (
                            <>
                                <li>
                                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                        About
                                    </NavLink>
                                </li>
                                {userRole === 'ADMIN' && (
                                    <li>
                                        <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}>
                                            Admin Panel
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                        {!isLoggedIn && (
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

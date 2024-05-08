import React, { useState } from 'react';
import Login from "./Login";
import SLoginPopupMainComponent from "./styles.LoginPopupMainComponent";
import { NavLink } from "react-router-dom";

const LoginPopupMainComponent = ({ isLoggedIn, handleLogout }) => {
    const [showLogin, setShowLogin] = useState(false);

    const handleOpenLogin = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleLoginSuccess = () => {
        setShowLogin(false); // Close the popup upon successful login
    };

    const handleLogoutClick = () => {
        handleLogout(); // Call the logout function passed from the parent component
    };

    return (
        <SLoginPopupMainComponent>
            {/* Conditionally render the button icon based on login status */}
            <div className="dropdown">
                <button onClick={showLogin ? handleCloseLogin : handleOpenLogin}>
                    <img
                        width="24"
                        height="24"
                        src={isLoggedIn ? "https://img.icons8.com/pastel-glyph/64/person-male--v1.png" : "https://img.icons8.com/pastel-glyph/64/person-male--v3.png"}
                        alt="person-icon"
                    />
                </button>
                <div className={`dropdown-content ${showLogin ? 'show' : ''}`}>
                    {/* Render the menu items */}
                    {isLoggedIn ? (
                        <ul>
                            <li>
                                <NavLink to="/account">Account Information</NavLink>
                            </li>
                            <li>
                                <NavLink to="/demo-upload">Demo Upload</NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    ) : (
                        <ul>
                            <li>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </li>
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
        </SLoginPopupMainComponent>
    );
};

export default LoginPopupMainComponent;

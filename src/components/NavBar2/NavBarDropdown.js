import React, { useState } from 'react';
import SNavBarDropdown from "./styles.NavBarDropdown";
import { NavLink } from 'react-router-dom';

const NavBarDropdown = ({ isLoggedIn, handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <SNavBarDropdown>
            <button className="dropdown-button" onClick={toggleDropdown}>
                <img
                    width="24"
                    height="24"
                    src={isLoggedIn ? "https://img.icons8.com/pastel-glyph/64/000000/person-male--v1.png" : "https://img.icons8.com/pastel-glyph/64/000000/person-male--v3.png"}
                    alt="person-icon"
                />
            </button>
            <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                <ul>
                    <li>
                        <NavLink to="/signup">Signup</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/account">Account Information</NavLink>
                    </li>
                    <li>
                        <NavLink to="/demo-upload">Demo Upload</NavLink>
                    </li>
                </ul>
            </div>
        </SNavBarDropdown>
    );
};

export default NavBarDropdown;

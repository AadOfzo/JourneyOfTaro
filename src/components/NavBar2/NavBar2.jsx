import React, {useRef, useState} from 'react';
import SnavBar2 from './styles.navBar2';
import {NavLink} from "react-router-dom";

function NavBar2() {
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
                        <li><NavLink to="/"
                                     className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Home
                        </NavLink></li>

                        <li><NavLink to="/music"
                                     className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Music
                        </NavLink></li>

                        <li><NavLink to="/samples"
                                     className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Samples
                        </NavLink></li>

                        <li><NavLink to="/about"
                                     className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            About
                        </NavLink></li>

                        <li><NavLink to="/upload"
                                     className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Demo Upload
                        </NavLink></li>

                        <li><NavLink to="/login"
                                     className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                            Login
                        </NavLink></li>

                        <li><a href="/contact">Contact</a></li>
                    </ul>
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
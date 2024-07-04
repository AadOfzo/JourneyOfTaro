import React, {useRef, useState} from 'react';
import './Navbar.css'
import {NavLink} from "react-router-dom";
import MusicPlayerTop from "../musicPlayer/MusicPlayerTop";
import SnavBar2 from "../NavBar2/styles.navBar2";


function Navbar() {
    const navRef = useRef();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    return (
        <SnavBar2 ref={navRef} className={`${isNavOpen ? 'open' : ''}`}>
            <header className='nav-container'>
                <nav ref={navRef} className="navbar-wrapper">
                    <div className="navbar-title">Journey of Taro</div>
                    <div className="navbar-menu-wrapper">
                        <div className={`menu ${isNavOpen ? 'open' : ''}`}>
                            <ul className='navbar-ul'>
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
                            </ul>
                        </div>
                        <MusicPlayerTop/>
                    </div>
                    <div className="hamburger" onClick={toggleNav}>
                        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                        <div className={`bar ${isNavOpen ? 'open' : ''}`}></div>
                    </div>
                </nav>
                {/*Music Player Top*/}
            </header>
        </SnavBar2>
    );
}

export default Navbar;
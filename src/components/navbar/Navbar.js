import React, {useRef} from 'react';
import './Navbar.css'
import {NavLink} from "react-router-dom";

//Icons
// import {FaBars,  FaTimes} from "react-icons/fa";
import MusicPlayerTop from "../musicPlayer/MusicPlayerTop";

function Navbar() {
    const navRef = useRef();

    return (
        <>
            <header className='navbar-header'>
                <nav ref={navRef} className="navbar-wrapper">
                    <div className="navbar-title">Journey of Taro</div>
                    <div className="navbar-menu-wrapper">
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
                        <MusicPlayerTop/>
                    </div>

                </nav>
                {/*Music Player Top*/}
            </header>
        </>
    );
}

export default Navbar;
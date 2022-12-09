import React from 'react';
import './Navbar.css'
import {NavLink} from "react-router-dom";

//Icons
// import { FaBars, FaHamburger, FaTimes } from "react-icons/fa";

function Navbar() {

    return (
        <>
            <header className='navbar-header'>
                <nav className="navbar-wrapper">

                    <label className="navbar-title">Journey of Taro</label>

                    <ul className='navbar-ul'>
                        <li><NavLink to="/"
                                     className={({ isActive }) => isActive ? 'active-link' : 'default-link'}>
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

                    {/*<button><FaHamburger/></button>*/}
                    {/*<button><FaTimes/></button>*/}


                </nav>


            </header>
        </>
    );
}

export default Navbar;
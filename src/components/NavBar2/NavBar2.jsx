import React, { useState } from 'react';
import SnavBar2 from './styles.navBar2';

function NavBar2() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <SnavBar2 className={`${isNavOpen ? 'open' : ''}`}>
                <div className="nav-container">
                    <div className={`menu ${isNavOpen ? 'open' : ''}`}>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">Music</a></li>
                            <li><a href="/services">Samples</a></li>
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
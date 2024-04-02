import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import Login from "../authentication/Login";

const LoginPopupMainComponent = () => {
    const [showLogin, setShowLogin] = useState(false);

    const handleOpenLogin = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <div>
            <button onClick={handleOpenLogin}>Open Login</button>
            {showLogin && <Login onClose={handleCloseLogin} />}
        </div>
    );
};

export default LoginPopupMainComponent;

import React, { useState } from 'react';
import Login from "./Login";

const LoginPopupMainComponent = () => {
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

    return (
        <div>
            <button onClick={handleOpenLogin}>Open Login</button>
            {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
};

export default LoginPopupMainComponent;

import React from 'react';
import './Login.css'
import LoginMenu from "../../components/authentication/LoginMenu";
import LoginPopupMainComponent from "../../components/login/LoginPopupMainComponent";

function LoginPage() {
    return (
        <div>
            <LoginMenu/>
            <LoginPopupMainComponent/>
        </div>
    );
}

export default LoginPage;
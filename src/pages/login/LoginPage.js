import React from 'react';
import './Login.css'
import LoginMenu from "../../components/authentication/LoginMenu";
import LoginPopupMainComponent from "../../components/login/LoginPopupMainComponent";
import Login from "../../components/authentication/Login";

function LoginPage() {
    return (
        <div>
            <Login/>
            <LoginMenu/>
            <LoginPopupMainComponent/>
        </div>
    );
}

export default LoginPage;
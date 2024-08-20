import React, {useState} from 'react';
import './Login.css'
import Login from "../../components/login/Login";
import UserAccount from "../../components/users/UserAccount";


function LoginPage() {
    const [showLogin, setShowLogin] = useState(false);

    return (

        <div className="page-menus-container">
            <div className="login-page-container">
                <Login/>
                <UserAccount />
            </div>
        </div>


    );
}

export default LoginPage;
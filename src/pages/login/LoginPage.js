import React from 'react';
import './Login.css'
import LoginMenu from "../../components/authentication/LoginMenu";
import LoginPopupMainComponent from "../../components/login/LoginPopupMainComponent";
import Login from "../../components/authentication/Login";
import UserForm3 from "../../components/forms/userForm/UserForm3";
import UserList from "../../components/authentication/UserList";

function LoginPage() {
    return (

        <div>
            {/*<Login/>*/}
            {/*<LoginMenu/>*/}
            <LoginPopupMainComponent/>

            <div>
                <UserForm3/>
            </div>

            <div>
                <UserList/>
            </div>
        </div>



    );
}

export default LoginPage;
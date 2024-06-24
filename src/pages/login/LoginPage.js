import React, {useState} from 'react';
import './Login.css'
import Login from "../../components/login/Login";
import UserForm3 from "../../components/forms/userForm/UserForm3";
import UserList from "../../components/lists/UserList";
import SLoginPopupMainComponent from "../../components/login/styles.LoginPopupMainComponent";
import LoginPopupMainComponent from "../../components/login/LoginPopupMainComponent";

function LoginPage() {
    const [showLogin, setShowLogin] = useState(false);

    return (

        <div>
            <Login/>
            {/*<LoginMenu/>*/}
            {/*<LoginPopupMainComponent/>*/}

            {/*<div>*/}
            {/*    <UserForm3/>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <UserList/>*/}
            {/*</div>*/}
        </div>



    );
}

export default LoginPage;
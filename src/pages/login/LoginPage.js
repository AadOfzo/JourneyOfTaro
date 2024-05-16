import React, {useState} from 'react';
import './Login.css'
import LoginMenu from "../../components/login/LoginMenu";
import LoginPopupMainComponent from "../../components/login/LoginPopupMainComponent";
import Login from "../../components/login/Login";
import UserForm3 from "../../components/forms/userForm/UserForm3";
import UserList from "../../components/lists/UserList";
import SLoginPopupMainComponent from "../../components/login/styles.LoginPopupMainComponent";

function LoginPage() {
    const [showLogin, setShowLogin] = useState(false);

    // const handleOpenLogin = () => {
    //     setShowLogin(true);
    // }
    //
    // const handleCloseLogin = () => {
    //     setShowLogin(false);
    // }


    return (

        <div>
            <Login/>
            {/*<LoginMenu/>*/}
            <LoginPopupMainComponent/>

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
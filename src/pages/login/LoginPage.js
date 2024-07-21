import React, {useState} from 'react';
import './Login.css'
import Login from "../../components/login/Login";
import UserList from "../../components/lists/UserList";
import UserProfile from "../../components/lists/UserProfile";
import UserComponent from "../../configs/users/UserComponent";

function LoginPage() {
    const [showLogin, setShowLogin] = useState(false);

    return (

        <div className="page-menus-container">
            <div className="login-page-container">
                <Login/>
                <UserProfile/>
                {/*<UserComponent/>*/}
                {/*<UserList/>*/}
                {/*<LoginMenu/>*/}
                {/*<LoginPopupMainComponent/>*/}

                {/*<div>*/}
                {/*    <UserForm3/>*/}
                {/*</div>*/}

                {/*<div>*/}
                {/*    <UserList/>*/}
                {/*</div>*/}
            </div>
        </div>


    );
}

export default LoginPage;
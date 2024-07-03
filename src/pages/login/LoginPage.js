import React, {useState} from 'react';
import './Login.css'
import Login from "../../components/login/Login";
import UserList from "../../components/lists/UserList";

function LoginPage() {
    const [showLogin, setShowLogin] = useState(false);

    return (

        <div>
            <Login/>
            <UserList/>
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
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import UserList from "../../components/lists/UserList";
import SuccessMessage from "../../components/messaging/SuccessMessage";
import UserForm2 from "../../components/forms/userForm/UserForm2";
import UserForm3 from "../../components/forms/userForm/UserForm3";
import UserProfile from "../../components/lists/UserProfile";

const ComponentRoutes = () => {
    return (
        <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/signup" element={<UserForm2 />} />
            <Route path="/account" element={<UserList />} />
            <Route path="/success" element={<SuccessMessage />} />
        </Routes>
    );
};

export default ComponentRoutes;

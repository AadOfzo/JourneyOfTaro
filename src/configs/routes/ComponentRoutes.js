import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import UserForm3 from "../../components/forms/userForm/UserForm3";
import UserList from "../../components/lists/UserList";
import SuccessMessage from "../../components/messaging/SuccessMessage";

const ComponentRoutes = () => {
    return (
        <Routes>
            <Route path="/signup" element={<UserForm3 />} />
            <Route path="/account" element={<UserList />} />
            <Route path="/success" element={<SuccessMessage />} />
        </Routes>
    );
};

export default ComponentRoutes;

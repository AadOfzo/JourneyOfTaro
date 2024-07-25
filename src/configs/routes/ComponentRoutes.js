import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import UserList from "../../components/lists/UserList";
import SuccessMessage from "../../components/messaging/SuccessMessage";
import UserForm2 from "../../components/forms/userForm/UserForm2";
import UserProfile from "../../components/lists/UserProfile";
import ErrorMessage from "../../components/messaging/ErrorMessage";
import ImageForm from "../../components/forms/imageForm/ImageForm";
import SongForm from "../../components/forms/musicForm/SongForm";
import WelcomeMessage from "../../components/messaging/WelcomeMessage";

const ComponentRoutes = () => {
    return (
        <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/signup" element={<UserForm2 />} />
            <Route path="/account" element={<UserList />} />
            <Route path="/success" element={<SuccessMessage />} />
            <Route path="/error" element={<ErrorMessage />} />
            <Route path="/welcome" element={<WelcomeMessage />} />
            <Route path="/image-form" element={<ImageForm />} />
            <Route path="/song-form" element={<SongForm />} />
        </Routes>
    );
};

export default ComponentRoutes;

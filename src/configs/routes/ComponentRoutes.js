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
import MusicApp from "../../components/musicPlayer/MusicApp";
import MusicPlayerTop from "../../components/musicPlayer/MusicPlayerTop";
import ContentContainer from "../../components/contentLayout/ContentContainer";
import UserAccount from "../../components/users/UserAccount";
import PageMenu from "../../components/pageMenu/PageMenu";

const ComponentRoutes = () => {
    return (
        <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/signup" element={<UserForm2 />} />
            <Route path="/account" element={<UserList />} />
            <Route path="/user-account" element={<UserAccount />} />
            <Route path="/success" element={<SuccessMessage />} />
            <Route path="/error" element={<ErrorMessage />} />

            <Route path="/content-container" element={<ContentContainer />} />
            <Route path="/page-menu" element={<PageMenu />} />

            <Route path="/image-form" element={<ImageForm />} />
            <Route path="/song-form" element={<SongForm />} />
            <Route path="/music-app" element={<MusicApp />} />
            <Route path="/music-player-top" element={<MusicPlayerTop />} />
        </Routes>
    );
};

export default ComponentRoutes;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Music from '../../pages/music/MusicPage';
import Samples from '../../pages/samples/Samples';
import About from '../../pages/about/About';
import LoginPage from '../../pages/login/LoginPage';
import ImagePage from '../../pages/images/ImagePage';
import NotFound from '../../pages/notfound/NotFound';
import UserForm3 from "../../components/forms/userForm/UserForm3";
import UserList from "../../components/lists/UserList";
import UserProfile from "../../components/lists/UserProfile";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/images" element={<ImagePage />} />
            <Route path="/signup" element={<UserForm3 />} />
            <Route path="/user/:username" element={<UserProfile />} />
            <Route path="/account" element={<UserList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default PageRoutes;

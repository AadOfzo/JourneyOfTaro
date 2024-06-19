import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/home/Home';
import Music from '../../pages/music/MusicPage';
import Samples from '../../pages/samples/Samples';
import About from '../../pages/about/About';
import LoginPage from '../../pages/login/LoginPage';
import UploadPage from '../../pages/uploadpage/UploadPage';
import ImagePage from '../../pages/images/ImagePage';
import NotFound from '../../pages/notfound/NotFound';

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/samples" element={<Samples />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/images" element={<ImagePage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default PageRoutes;

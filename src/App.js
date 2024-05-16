import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import NavBar2 from './components/NavBar2/NavBar2';
import NotFound from './pages/notfound/NotFound';

// Pages
import Home from './pages/home/Home';
import Music from './pages/music/MusicPage';
import Samples from './pages/samples/Samples';
import About from './pages/about/About';
import LoginPage from './pages/login/LoginPage';
import UploadPage from './pages/uploadpage/UploadPage';
import ImagePage from "./pages/images/ImagePage";
import PostRequestPage from "./pages/requests/PostRequestPage";
import GetRequestPage from "./pages/requests/GetRequestPage";
import ImageRequestPage from "./pages/imageRequest/ImageRequestPage";
import FooterMenu from "./components/footer/FooterMenu";
import LoginPopupMainComponent from "./components/login/LoginPopupMainComponent";
import UserForm3 from "./components/forms/userForm/UserForm3";
import UserList from "./components/lists/UserList";
import SuccessMessage from "./components/messaging/SuccessMessage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedOut, setLoggedOut] = useState(true);

    // Handle login
    const handleLogin = () => {
        // Your login logic here
        setIsLoggedIn(true); // For example, set isLoggedIn to true when login is successful
        setLoggedOut(false); // Set loggedOut state to false
    };

    // Check if user is logged in based on token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists, false otherwise
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from local storage
        setIsLoggedIn(false); // Update login state to false
        setLoggedOut(true); // Set loggedOut state to true
    };


    return (
        <div className="main-outer-container">
            {/* Navigation */}
            <NavBar2 isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

            {/* Page Routes */}
            <div className="main-content-container">
                <Routes>
                    // Pages
                    <Route path="/" element={<Home />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/samples" element={<Samples />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                    <Route path="/images" element={<ImagePage />} />
                    <Route path="/postRequestPage" element={<PostRequestPage />} />
                    <Route path="/getRequestPage" element={<GetRequestPage />} />
                    <Route path="/imageRequestPage" element={<ImageRequestPage />} />
                    <Route path="*" element={<NotFound />} />
                    // Components
                    <Route path="/signup" element={<UserForm3 />} />
                    <Route path="/account" element={<UserList/>} />
                    <Route path="/demo-upload" element={<UploadPage/>} />
                    <Route path="/success" element={<SuccessMessage/>} />

                </Routes>
            </div>

            <footer className="main-footer">
                <div className="footer-box">
                    <h1>Vet toffe Footer</h1>
                </div>
                <FooterMenu isLoggedIn={isLoggedIn} handleLogin={handleLogin} handleLogout={handleLogout} />
            </footer>
        </div>
    );
}

export default App;

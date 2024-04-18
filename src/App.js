import './App.css';
import React from 'react';
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


function App() {

    return (

        <div className="main-outer-container">
            {/* Navigation */}
            <NavBar2/>

            {/* Page Routes : Router geeft error dat er niet 2 Routers mogen zijn */}
            {/*<Router>*/}
            <div className="main-content-container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/samples" element={<Samples/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/upload" element={<UploadPage/>}/>
                    <Route path="/images" element={<ImagePage/>}/>
                    <Route path="/postRequestPage" element={<PostRequestPage/>}/>
                    <Route path="/getRequestPage" element={<GetRequestPage/>}/>
                    <Route path="/imageRequestPage" element={<ImageRequestPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
            {/*</Router>*/}

            <footer className="main-footer">
                <div className="footer-box">
                    <h1>Vet toffe Footer</h1>
                </div>
            </footer>
        </div>
    );
}

export default App;
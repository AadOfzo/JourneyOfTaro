import './App.css';
// React
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// // Components
import Navbar from "./components/navbar/Navbar";
import MusicPlayerBottom from "./components/musicPlayer/MusicPlayerBottom";


// // // Pages
import Home from "./pages/home/Home";
import Music from "./pages/music/MusicPage";
import Samples from "./pages/samples/Samples";
import About from "./pages/about/About";
import Login from "./pages/login/Login";
import UploadPage from "./pages/uploadpage/UploadPage";
import NotFound from "./pages/notfound/NotFound";

function App() {
    return (
        <>
            <div className="main-outer-container">

                {/*Navigation*/}
                {/*<Router> Routes werken, maar niet met een Router er omheen*/}
                <React.Fragment>
                    <Navbar/>
                </React.Fragment>

                {/*Page Routes*/}
                {/*<Router>*/}
                <div className="main-content-container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/samples" element={<Samples/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/upload" element={<UploadPage/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
                {/*</Router>*/}

                {/*Music Player Bottom*/}
                <MusicPlayerBottom/>

                <footer className="main-footer">
                    {/*Hier komt de Footer!!*/}
                    <div className="footer-box">
                        <h1>Vet toffe Footer</h1>
                    </div>
                </footer>

            </div>
        </>
    );
}

export default App;

import React from 'react';
import './NotFound.css'
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: "1",
            textAlign: "center",
            padding: "1rem",
        }}>
            <h1>Page not Found</h1>
            <p>Take me Back <Link to="/" style={{color: 'red'}}>Home Page.</Link></p>
        </div>
    );
}

export default NotFound;
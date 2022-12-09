import React from 'react';
import './NotFound.css'
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div>
            <h1>Page not Found</h1>
            <p>Take me Back <Link to="/">Home Page.</Link></p>
        </div>
    );
}

export default NotFound;
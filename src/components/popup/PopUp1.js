import React from 'react';

const Popup1 = ({ message, onYes, onNo }) => {
    return (
        <div className="popup">
            <h3>{message}</h3>
            <p>Proceed?</p>
            <button onClick={onYes}>Yes</button>
            <button onClick={onNo}>No</button>
        </div>
    );
};

export default Popup1;

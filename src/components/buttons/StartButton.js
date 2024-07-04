import React from 'react';
import { StartButton } from './styles.Buttons';

const StartButtonComponent = ({ onClick }) => {
    return (
        <StartButton className="start-button" onClick={onClick}>
            Start Tour!
        </StartButton>
    );
};

export default StartButtonComponent;

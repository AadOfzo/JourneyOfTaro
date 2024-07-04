import React, { useState } from 'react';
import SongForm from "../forms/musicForm/SongForm";
import MusicPlayerTop from './MusicPlayerTop';

const MusicApp = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    return (
        <div>
            <SongForm onPlayPause={handlePlayPause} />
            <MusicPlayerTop currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
    );
};

export default MusicApp;

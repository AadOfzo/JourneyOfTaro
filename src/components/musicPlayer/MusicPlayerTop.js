import React, { useEffect, useState } from 'react';
import SMusicPlayer from "./styles.MusicPlayer";
import { IconContext } from "react-icons";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

const MusicPlayerTop = ({ currentSong, isPlaying, setIsPlaying }) => {
    const [audio, setAudio] = useState(new Audio());
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (currentSong && isPlaying) {
            loadAudio(currentSong.songUrl);
            playAudio();
        } else {
            pauseAudio();
        }
    }, [currentSong, isPlaying]);

    useEffect(() => {
        audio.addEventListener('timeupdate', updateTime);
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
        };
    }, [audio]);

    const loadAudio = (url) => {
        audio.src = url;
        audio.load();
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });
    };

    const playAudio = () => {
        audio.play();
    };

    const pauseAudio = () => {
        audio.pause();
    };

    const updateTime = () => {
        setCurrentTime(audio.currentTime);
    };

    const playingButton = () => {
        if (isPlaying) {
            pauseAudio();
            setIsPlaying(false);
        } else {
            playAudio();
            setIsPlaying(true);
        }
    };

    return (
        <SMusicPlayer>
            <div className="music-player-top-container">
                <h2>Playing now</h2>
                <img className="music-cover" src="https://picsum.photos/200/200" alt="Music cover" />
                <div className="song-info-container">
                    <h3 className="song-title">{currentSong ? currentSong.songTitle : 'Song Title'}</h3>
                    <p className="artist-name">{currentSong ? currentSong.artistName : 'Artist Name'}</p>
                </div>
                <div className="time">
                    <p>{formatTime(currentTime)}</p>
                    <p>{formatTime(duration)}</p>
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    className="timeline"
                    onChange={(e) => {
                        setCurrentTime(parseInt(e.target.value));
                        audio.currentTime = e.target.value;
                    }}
                />
                <div className="music-player-icon-container">
                    <button className="playButton">
                        <IconContext.Provider value={{ size: "3em", color: "var(--primary)" }}>
                            <BiSkipPrevious />
                        </IconContext.Provider>
                    </button>
                    {!isPlaying ? (
                        <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "var(--primary)" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </button>
                    ) : (
                        <button className="playButton" onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "var(--primary)" }}>
                                <AiFillPauseCircle />
                            </IconContext.Provider>
                        </button>
                    )}
                    <button className="playButton">
                        <IconContext.Provider value={{ size: "3em", color: "var(--primary)" }}>
                            <BiSkipNext />
                        </IconContext.Provider>
                    </button>
                </div>
            </div>
        </SMusicPlayer>
    );
}

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default MusicPlayerTop;

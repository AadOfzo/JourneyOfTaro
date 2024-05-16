import React, {useEffect, useState} from 'react';
import SMusicPlayer from "./styles.MusicPlayer";
import useSound from "use-sound";
import Perahu from "../../assets/audio/08_Perahu.mp3";
import {IconContext} from "react-icons";
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {AiFillPauseCircle, AiFillPlayCircle} from "react-icons/ai";

function MusicPlayerTop() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({
        min: "",
        sec: ""
    });

    const [currTime, setCurrTime] = useState({ min: 0, sec: 0 });
    const [seconds, setSeconds] = useState(0);
    const [play, {pause, duration, sound}] = useSound(Perahu);

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                const currentTime = Math.floor(sound.seek([]));
                const min = Math.floor(currentTime / 60);
                const sec = Math.floor(currentTime % 60);
                setCurrTime({ min, sec });
                setSeconds(currentTime); // Update seconds state
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);


    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };


    return (
            <SMusicPlayer>
                <div className="music-player-top-container">
                    <h2>Playing now</h2>
                    <img className="music-cover" src="https://picsum.photos/200/200"/>
                    <div className="song-info-container">
                        <h3 className="song-title">Song Title</h3>
                        <p className="artist-name">Artist Name</p>
                    </div>
                    <div className="time">
                        <p>
                            {currTime.min}:{currTime.sec}
                        </p>
                        <p>
                            {time.min}:{time.sec}
                        </p>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={duration / 1000}
                        default="0"
                        value={seconds}
                        className="timeline"
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}
                    />
                    <div className="music-player-icon-container">
                        <button className="playButton">
                            <IconContext.Provider value={{size: "3em", color: "var(--primary)"}}>
                                <BiSkipPrevious/>
                            </IconContext.Provider>
                        </button>
                        {!isPlaying ? (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{size: "3em", color: "var(--primary)"}}>
                                    <AiFillPlayCircle/>
                                </IconContext.Provider>
                            </button>
                        ) : (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{size: "3em", color: "var(--primary)"}}>
                                    <AiFillPauseCircle/>
                                </IconContext.Provider>
                            </button>
                        )}
                        <button className="playButton">
                            <IconContext.Provider value={{size: "3em", color: "var(--primary)"}}>
                                <BiSkipNext/>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>

            </SMusicPlayer>
    );
}

export default MusicPlayerTop;
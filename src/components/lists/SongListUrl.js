import React, { useEffect, useState } from "react";
import axios from "axios";

function SongListUrl() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        async function fetchSongs() {
            try {
                const response = await axios.get('http://localhost:8080/songs');
                setSongs(response.data);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        }

        fetchSongs();
    }, []);

    return (
        <div>
            <h2>Song List</h2>
            {songs.map((song) => (
                <div key={song.id}>
                    <audio controls>
                        <source src={song.songUrl} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                    <p>{song.songTitle}</p>
                    <p>{song.artistName}</p>
                </div>
            ))}
        </div>
    );
}
export default SongListUrl;

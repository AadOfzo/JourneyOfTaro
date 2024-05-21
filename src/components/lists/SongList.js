import React, { useState, useEffect} from "react";
import axios from "axios";
import './ListsMainStyle.css';
import {SongListTitle} from "../forms/musicForm/styles.SongForm";

function SongList() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongs();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songs');
            console.log(response.data);
            setSongs(response.data);
        } catch (e) {
            console.error('Error fetching Songs!', e);
        }
    };

    return (
        <div className="song-list-container">
            <SongListTitle>Song List</SongListTitle>
            <table>
                <thead>
                <tr>
                    <th>Song ID</th>
                    <th>Song Title</th>
                    <th>Artist Name</th>
                    <th>File Name</th>
                    <th>Upload Time</th>
                    <th>Song Collection</th>
                    <th>Audio URL</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {songs.map(song => (
                    <tr key={song.id}>
                        <td>{song.id}</td>
                        <td>{song.songTitle}</td>
                        <td>{song.artistName}</td>
                        <td>{song.filename}</td>
                        <td>{song.uploadTime}</td>
                        <td>{song.songCollection}</td>
                        <td>{song.audioUrl}</td>
                        <td><button>Delete Song</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SongList;

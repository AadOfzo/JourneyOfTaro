import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    SongContainer,
    SongListContainer,
    SongTitle,
    ArtistName,
    AudioPlayerContainer,
    SongListItem,
} from "./styles.SongList";
import {
    SongActionButtons,
    SongAddButton,
    SongDeleteButton,
} from "../../buttons/styles.Buttons";
import ImageForm from "../../forms/imageForm/ImageForm";
import SongCollectionManager from "../../forms/musicForm/SongCollectionManager";

function SongListTest() {
    const [songs, setSongs] = useState([]);
    const [songCollections, setSongCollections] = useState([]);
    const [expandedSongId, setExpandedSongId] = useState(null);
    const [message, setMessage] = useState('');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchSongs();
                await fetchSongCollections();
            } catch (error) {
                console.error('Error fetching songs or collections: ', error);
            }
        };
        fetchData();
    }, [reload]);

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songs');
            setSongs(response.data);
        } catch (e) {
            console.error('Error fetching Songs!', e);
        }
    };

    const fetchSongCollections = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songCollections');
            setSongCollections(response.data);
        } catch (e) {
            console.error('Error fetching collections!', e);
        }
    };

    const handleAddSong = async (id) => {
        try {
            await axios.post(`http://localhost:8080/songs/${id}`);
            setReload(!reload);
        } catch (error) {
            console.error('Error Adding song:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/songs/${id}`);
            setReload(!reload);
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleAddSongToCollection = async (songId, collectionId) => {
        try {
            await axios.post(`http://localhost:8080/songCollections/${collectionId}/songs`, [songId]);
            setMessage('Song added to collection successfully.');
            setReload(!reload);
        } catch (error) {
            setMessage('Error adding song to collection.');
            console.error('Error adding song to collection:', error);
        }
    };

    const handleReload = () => {
        setMessage('');
        setReload(!reload);
    };

    const toggleSongDetails = (id) => {
        if (expandedSongId === id) {
            setExpandedSongId(null);
        } else {
            setExpandedSongId(id);
        }
    };

    return (
        <SongContainer>
            <SongListContainer>
                <h1>Song List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Please select an uploaded song in the list below to open options!</th>
                    </tr>
                    <tr>
                        <th>Song Title</th>
                        <th>Artist Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songs.map(song => (
                        <React.Fragment key={song.id}>
                            <SongListItem as="tr" onClick={() => toggleSongDetails(song.id)}>
                                <td><SongTitle>{song.songTitle}</SongTitle></td>
                                <td><ArtistName>{song.artistName}</ArtistName></td>
                            </SongListItem>
                            {expandedSongId === song.id && (
                                <tr>
                                    <td colSpan="2">
                                        <AudioPlayerContainer>
                                            <audio controls>
                                                <source src={`data:audio/mp3;base64,${song.songData}`} type="audio/mp3"/>
                                                Your browser does not support the audio element.
                                            </audio>
                                        </AudioPlayerContainer>
                                        <SongActionButtons>
                                            <SongAddButton onClick={() => handleAddSong(song.id)}>Add</SongAddButton>
                                            <SongDeleteButton onClick={() => handleDelete(song.id)}>Delete</SongDeleteButton>
                                        </SongActionButtons>
                                        {/*<ImageForm />*/}
                                        <SongCollectionManager songs={[song]} />
                                        <h2>Add Song to Existing Collection</h2>
                                        <select onChange={(e) => handleAddSongToCollection(song.id, e.target.value)}>
                                            <option disabled value="">- - select a collection - -</option>
                                            {songCollections.map(collection => (
                                                <option key={collection.id} value={collection.id}>{collection.songCollectionTitle}</option>
                                            ))}
                                        </select>
                                        {message && <p>{message}</p>}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </SongListContainer>
        </SongContainer>
    );
}

export default SongListTest;

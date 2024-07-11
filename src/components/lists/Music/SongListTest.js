import React, { useState, useEffect } from "react";
import ApiService from "../../../configs/utilities/axios/ApiService";
import {
    SongContainer,
    SongListContainer,
    GlowingRow,
    SongTitle,
    ArtistName,
    AudioPlayerContainer,
    SongListItem,
} from "./styles.SongList"; // Adjust import path as per your project structure
import {
    SongActionButtons,
    SongAddButton,
    SongDeleteButton,
} from "../../buttons/styles.Buttons"; // Adjust import path as per your project structure

function SongListTest() {
    const [songs, setSongs] = useState([]);
    const [songCollections, setSongCollections] = useState([]);
    const [expandedSongId, setExpandedSongId] = useState(null);
    const [message, setMessage] = useState('');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [songsResponse, collectionsResponse] = await Promise.all([
                    ApiService.fetchSongs(),
                    ApiService.fetchSongCollections()
                ]);
                setSongs(songsResponse);
                setSongCollections(collectionsResponse);
            } catch (error) {
                console.error('Error fetching songs or collections: ', error);
            }
        };

        fetchData();
    }, [reload]);

    const handleAddSong = async (id) => {
        try {
            await ApiService.addSong(id);
            setReload(!reload);
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await ApiService.deleteSong(id);
            setReload(!reload);
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleAddSongToCollection = async (songId, collectionId) => {
        try {
            await ApiService.addSongToCollection(songId, collectionId);
            setMessage('Song added to collection successfully.');
            setReload(!reload);
        } catch (error) {
            setMessage('Error adding song to collection.');
            console.error('Error adding song to collection:', error);
        }
    };

    const toggleSongDetails = (id) => {
        setExpandedSongId(expandedSongId === id ? null : id);
    };

    return (
        <SongContainer>
            <SongListContainer>
                <h1>Song List</h1>
                <table>
                    <thead>
                    <tr>
                        <th colSpan="2">Please select an uploaded song in the list below to open options!</th>
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
                                <GlowingRow>
                                    <td colSpan="2">
                                        <AudioPlayerContainer>
                                            <audio controls>
                                                <source src={song.songUrl} type="audio/mp3" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </AudioPlayerContainer>
                                        <SongActionButtons>
                                            <SongAddButton onClick={() => handleAddSong(song.id)}>Add</SongAddButton>
                                            <SongDeleteButton onClick={() => handleDelete(song.id)}>Delete</SongDeleteButton>
                                        </SongActionButtons>
                                        <h2>Add Song to Existing Collection</h2>
                                        <select onChange={(e) => handleAddSongToCollection(song.id, e.target.value)}>
                                            <option disabled value="">- - select a collection - -</option>
                                            {songCollections.map(collection => (
                                                <option key={collection.id} value={collection.id}>{collection.songCollectionTitle}</option>
                                            ))}
                                        </select>
                                        {message && <p>{message}</p>}
                                    </td>
                                </GlowingRow>
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

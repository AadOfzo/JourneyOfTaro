import React, {useState, useEffect} from "react";
import axios from "axios";
import {
    SongContainer,
    SongListContainer,
    SongActionButtons,
    SongAddButton,
    SongDeleteButton
} from "../forms/musicForm/styles.SongForm";
import ImageForm from "../forms/imageForm/ImageForm";
import SongCollectionManager from "../forms/musicForm/SongCollectionManager";
import SongCollection from "../forms/musicForm/SongCollection";

function SongListTest() {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [songCollectionId, setSongCollectionId] = useState(0);
    const [songCollections, setSongCollections] = useState([]);
    const [message, setMessage] = useState('');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchSongs();
        fetchSongCollections();
    }, [reload]); // Reload when 'reload' state changes

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songs');
            setSongs(response.data);
        } catch (e) {
            console.error('Error fetching Songs!', e);
        }
    };

    const fetchSongBase64 = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/songs/${id}/base64`);
            setCurrentSong(response.data);
        } catch (e) {
            console.error('Error fetching song base64!', e);
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
            setReload(!reload); // Trigger reload
        } catch (error) {
            console.error('Error Adding song:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/songs/${id}`);
            setReload(!reload); // Trigger reload
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleAddSongToCollectionId = (e) => {
        setSongCollectionId(e.target.value);
    };

    const handleAddSongToCollection = async (songId, songCollectionId) => {
        try {
            await axios.post(`http://localhost:8080/songCollections/${songCollectionId}/songs`, [songId]);
            setMessage('Song added to collection successfully.');
            setReload(!reload); // Trigger reload
        } catch (error) {
            setMessage('Error adding song to collection.');
            console.error('Error adding song to collection:', error);
        }
    };

    const handleReload = () => {
        setMessage('');
        setReload(!reload); // Trigger reload
    };

    return (
        <SongContainer>
            <SongListContainer>
                <h1>Song List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Song ID</th>
                        <th>Song Title</th>
                        <th>Artist Name</th>
                        <th>Preview</th>
                        <th>Actions</th>
                        <th>Add an Image to the Song</th>
                        <th>Song Collection</th>
                        <th>Song Collection Type</th>
                        <th>Message</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songs.map(song => (
                        <tr key={song.id}>
                            <td>{song.id}</td>
                            <td>{song.songTitle}</td>
                            <td>{song.artistName}</td>
                            <td>
                                <audio controls>
                                    <source src={`data:audio/mp3;base64,${song.songData}`} type="audio/mp3"/>
                                    Your browser does not support the audio element.
                                </audio>
                            </td>
                            <td>
                                <SongActionButtons>
                                    <SongAddButton onClick={() => handleAddSong(song.id)}>Add</SongAddButton>
                                    <SongDeleteButton onClick={() => handleDelete(song.id)}>Delete</SongDeleteButton>
                                </SongActionButtons>
                            </td>
                            <td>
                                <ImageForm/>
                            </td>
                            <td>
                                <SongCollectionManager songs={[song]}/>
                            </td>
                            <td>
                                <SongCollection/>
                            </td>
                            <td>
                                <select name="song-collection" id="song-collection"
                                        onChange={handleAddSongToCollectionId}>
                                    <option disabled value="DEFAULT">- - select an option - -</option>
                                    {songCollections.map(collection => (
                                        <option key={collection.id}
                                                value={collection.id}>{collection.songCollectionTitle}</option>
                                    ))}
                                </select>
                                <SongAddButton onClick={() => handleAddSongToCollection(song.id, songCollectionId)}>Add
                                    to Collection</SongAddButton>
                                {message && <div>{message}</div>}
                                {message && <button onClick={handleReload}>OK</button>}
                            </td>
                            <td>{song.songCollectionType}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {currentSong && (
                    <audio controls>
                        <source src={`data:audio/mp3;base64,${currentSong}`} type="audio/mp3"/>
                    </audio>
                )}
            </SongListContainer>
        </SongContainer>
    );
}

export default SongListTest;


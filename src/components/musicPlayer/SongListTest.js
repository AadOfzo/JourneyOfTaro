import React, {useState, useEffect} from "react";
import axios from "axios";
import {SongActionButtons, SongAddButton, SongDeleteButton} from "../forms/musicForm/styles.SongForm";
import ImageForm from "../forms/imageForm/ImageForm";
import {ImageListContainer} from "../forms/imageForm/styles.ImageForm";

function SongListTest() {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [songCollectionId, setSongCollectionId] = useState(0);

    useEffect(() => {
        fetchSongs();
    }, []);

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

    const handleAddSong = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/songs/${id}`);
            await fetchSongs();
        } catch (error) {
            console.error('Error Adding song:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/songs/${id}`);
            await fetchSongs();
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleAddSongToCollectionId = (e) => {
        setSongCollectionId(e.target.value);
    };

    const handleImageChange = (e) => {
        const uploadedFile = e.target.files[0];
        setImageFile(uploadedFile);
        setImagePreviewUrl(URL.createObjectURL(uploadedFile));
    };

    const handleImageUpload = async (e, songId) => {
        e.preventDefault();
        if (!imageFile) return;

        const formData = new FormData();
        formData.append("imagefile", imageFile);

        try {
            await axios.post(`http://localhost:8080/songs/${songId}/uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Image uploaded successfully!');
            setImageFile(null);
            setImagePreviewUrl('');
            fetchSongs();
        } catch (e) {
            console.error('Error uploading image!', e);
        }
    };

    return (
        <div className="song-list-container">
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
                            {/*<form onSubmit={(e) => handleImageUpload(e, song.id)}>*/}
                            {/*    <input type="file" onChange={handleImageChange}/>*/}
                            {/*    {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview"/>}*/}
                            {/*    <button type="submit">Upload Image</button>*/}
                            {/*</form>*/}
                        </td>
                        <td>
                            <select name="song-collection" id="song-collection" onChange={handleAddSongToCollectionId}>
                                <option disabled value="DEFAULT">- - select an option - -</option>
                                {songs.map(song => (
                                    <option key={song.id} value={song.id}>{song.songTitle}</option>
                                ))}
                            </select>
                        </td>
                        <td>{song.songCollectionType}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {currentSong && (
                <audio controls>
                    <source src={`data:audio/mp3;base64,${currentSong}`} type="audio/mp3"/>
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
}

export default SongListTest;

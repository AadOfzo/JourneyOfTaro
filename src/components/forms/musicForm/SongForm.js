// SongForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Form,
    // FileInput,
    // ChooseFileButton,
    // PlusIcon,
    PreviewSongs,
    LoadingWheel,
} from './styles.SongForm';

const SongForm = () => {
    const [songTitle, setSongTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState([]);

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songs');
            setSongs(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Add logic to post the song data to your backend
            await axios.post('http://localhost:8080/fileUpload', { songTitle });

            // Update songs after adding a new song
            await fetchSongs();

            console.log('Song added successfully!');
        } catch (error) {
            console.error('Error adding song:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <label>
                    Song Title:
                    <input type="text" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} />
                </label>
                {loading && <LoadingWheel />}
                <button type="submit">Add Song</button>
            </Form>

            <h2>Song List</h2>
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <div>
                            <div>{song.songTitle}</div>
                            {/* Use PreviewSongs component to display images */}
                            <PreviewSongs src={`http://localhost:8080/songs/${song.songTitle}`} alt="Preview" />
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default SongForm;

import React, { useState } from 'react';
import axios from 'axios';

const AddSongForm = () => {
    const [songTitle, setSongTitle] = useState('');
    const [songFile, setSongFile] = useState(null);

    const handleTitleChange = (e) => {
        setSongTitle(e.target.value);
    };

    const handleFileChange = (e) => {
        setSongFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('songTitle', songTitle);
            formData.append('file', songFile);

            // Connect met de fileUpload endpoint
            await axios.post('http://localhost:8080/fileUpload', formData);

            // Clear the form after successful submission
            setSongTitle('');
            setSongFile(null);

            console.log('Song added successfully!');
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Song Title:
                <input type="text" value={songTitle} onChange={handleTitleChange} />
            </label>
            <label>
                Song File:
                <input type="file" onChange={handleFileChange} />
            </label>
            <button type="submit">Add Song</button>
        </form>
    );
};

export default AddSongForm;

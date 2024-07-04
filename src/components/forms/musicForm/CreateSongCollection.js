import React, { useState } from 'react';
import axios from 'axios';

const CreateSongCollection = () => {
    const [newCollectionTitle, setNewCollectionTitle] = useState('');
    const [songIds, setSongIds] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateCollection = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8080/songCollections', {
                songCollectionTitle: newCollectionTitle,
                songIds: songIds,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSuccessMessage('Collection created successfully');
            setNewCollectionTitle('');
            setSongIds([]); // Reset song IDs
        } catch (error) {
            setErrorMessage('Error creating collection');
        }
    };

    return (
        <div>
            <h3>Create Song Collection</h3>
            <input
                type="text"
                placeholder="Collection Title"
                value={newCollectionTitle}
                onChange={(e) => setNewCollectionTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Song IDs (comma-separated)"
                value={songIds.join(',')}
                onChange={(e) => setSongIds(e.target.value.split(',').map(id => id.trim()))}
            />
            <button onClick={handleCreateCollection}>Create Collection</button>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
};

export default CreateSongCollection;

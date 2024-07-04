import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessMessage from "../../messaging/SuccessMessage";
import ErrorMessage from "../../messaging/ErrorMessage";

const SongCollection = () => {
    const [collections, setCollections] = useState([]);
    const [newCollectionTitle, setNewCollectionTitle] = useState('');
    const [songIds, setSongIds] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songCollections');
            setCollections(response.data);
        } catch (error) {
            setError('Error fetching collections');
        }
    };

    const handleCreateCollection = async () => {
        try {
            const songIdList = songIds.split(',').map(id => parseInt(id.trim()));
            const response = await axios.post('http://localhost:8080/songCollections', {
                songCollectionTitle: newCollectionTitle,
                songIds: songIdList,
            });
            setSuccessMessage('Collection created successfully');
            setNewCollectionTitle('');
            setSongIds('');
            fetchCollections();
        } catch (error) {
            setError('Error creating collection');
        }
    };

    return (
        <div>
            <h3>Song Collections</h3>
            {error && <ErrorMessage message={error} />}
            {successMessage && <SuccessMessage message={successMessage} />}
            <div>
                <input
                    type="text"
                    placeholder="Collection Title"
                    value={newCollectionTitle}
                    onChange={(e) => setNewCollectionTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Song IDs (comma-separated)"
                    value={songIds}
                    onChange={(e) => setSongIds(e.target.value)}
                />
                <button onClick={handleCreateCollection}>Create Collection</button>
            </div>
            <ul>
                {collections.map(collection => (
                    <li key={collection.id}>{collection.songCollectionTitle}</li>
                ))}
            </ul>
        </div>
    );
};

export default SongCollection;

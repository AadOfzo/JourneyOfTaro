import React, { useState, useEffect } from "react";
import axios from "axios";

function SongCollectionManager({ songs }) {
    const [newCollectionTitle, setNewCollectionTitle] = useState('');
    const [collections, setCollections] = useState([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songCollections');
            setCollections(response.data);
        } catch (error) {
            console.error('Error fetching collections!', error);
        }
    };

    const handleCreateSongCollection = async () => {
        try {
            await axios.post('http://localhost:8080/songCollections', {
                songIds: songs.map(song => song.id),
                songCollectionTitle: newCollectionTitle
            });
            setNewCollectionTitle('');
            fetchCollections();
            setMessage('New collection created successfully.');
        } catch (error) {
            console.error('Error creating song collection:', error);
            setMessage('Error creating new collection. Please try again later.');
        }
    };

    const handleAddSongToCollection = async () => {
        try {
            await axios.post(`http://localhost:8080/songCollections/${selectedCollectionId}/songs`, songs.map(song => song.id));
            fetchCollections();
            setSelectedCollectionId('');
            setMessage('Song added to collection successfully.');
        } catch (error) {
            console.error('Error adding song to collection:', error);
            setMessage('Error adding song to collection. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Create New Song Collection</h2>
            <input
                type="text"
                placeholder="Collection Title"
                value={newCollectionTitle}
                onChange={(e) => setNewCollectionTitle(e.target.value)}
            />
            <button onClick={handleCreateSongCollection}>Create Collection</button>

            <h2>Add Song to Existing Collection</h2>
            <select value={selectedCollectionId} onChange={(e) => setSelectedCollectionId(e.target.value)}>
                <option disabled value="">- - Select a collection - -</option>
                {collections.map(collection => (
                    <option key={collection.id} value={collection.id}>{collection.songCollectionTitle}</option>
                ))}
            </select>

            <button disabled={!selectedCollectionId} onClick={handleAddSongToCollection}>Add Song to Collection</button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default SongCollectionManager;

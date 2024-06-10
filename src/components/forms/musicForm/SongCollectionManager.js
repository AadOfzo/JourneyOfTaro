import React, { useState, useEffect } from "react";
import axios from "axios";

function SongCollectionManager({ songs }) {
    const [newCollectionTitle, setNewCollectionTitle] = useState('');
    const [collections, setCollections] = useState([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState('');

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songCollections');
            setCollections(response.data);
        } catch (e) {
            console.error('Error fetching collections!', e);
        }
    };

    const handleCreateSongCollection = async () => {
        try {
            await axios.post('http://localhost:8080/songCollections', {
                songIds: songs.map(song => song.id),
                title: newCollectionTitle
            });
            setNewCollectionTitle('');
            fetchCollections();
        } catch (error) {
            console.error('Error creating song collection:', error);
        }
    };

    const handleAddSongToCollection = async (songId) => {
        try {
            await axios.post(`http://localhost:8080/songCollections/${selectedCollectionId}/songs`, [songId]);
            fetchCollections();
        } catch (error) {
            console.error('Error adding song to collection:', error);
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
                <option disabled value="">- - select a collection - -</option>
                {collections.map(collection => (
                    <option key={collection.id} value={collection.id}>{collection.songCollectionTitle}</option>
                ))}
            </select>
        </div>
    );
}

export default SongCollectionManager;

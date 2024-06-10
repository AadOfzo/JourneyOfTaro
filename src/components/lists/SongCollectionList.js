import React, { useState, useEffect } from "react";
import axios from "axios";

function SongCollectionList() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songCollections');
            setCollections(response.data);
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
    };

    return (
        <div>
            <h1>Song Collections</h1>
            <table>
                <thead>
                <tr>
                    <th>Collection ID</th>
                    <th>Collection Title</th>
                </tr>
                </thead>
                <tbody>
                {collections.map(collection => (
                    <tr key={collection.id}>
                        <td>{collection.id}</td>
                        <td>{collection.songCollectionTitle}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SongCollectionList;

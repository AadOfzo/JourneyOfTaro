import React, { useState, useEffect } from 'react';
import { SongContainer, SongListContainer, ImageContainer, Image } from './styles.SongCollectionList';
import ImageForm from "../../forms/imageForm/ImageForm";
import ApiService from "../../../configs/utilities/axios/ApiService";
import LoadingComponent from "../../loadingWheel/LoadingComponent";

function SongCollectionList({ onVisibilityChange = () => {}, showActions = true }) {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await ApiService.fetchSongCollections();
            console.log('Response from backend:', response);
            setCollections(response);
        } catch (error) {
            console.error('Error fetching collections!', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleVisibility = async (collection) => {
        try {
            const updatedCollection = await ApiService.toggleSongCollectionVisibility(collection.id, !collection.isPublic);
            setCollections(prevCollections =>
                prevCollections.map(col =>
                    col.id === collection.id ? updatedCollection : col
                )
            );
            onVisibilityChange(updatedCollection); // Call the function
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    const handleImageUploaded = async (file, collectionId) => {
        try {
            const updatedCollection = await ApiService.addImageToSongCollection(collectionId, file);
            setCollections(prevCollections =>
                prevCollections.map(collection =>
                    collection.id === collectionId ? updatedCollection : collection
                )
            );
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const renderImage = (collection) => {
        if (collection.imageUrl) {
            return <Image src={collection.imageUrl} alt="Collection Image" />;
        } else {
            return <ImageForm onImageUploaded={(file) => handleImageUploaded(file, collection.id)} />;
        }
    };

    const toggleSongDetails = (id) => {
        setCollections(prevCollections =>
            prevCollections.map(collection =>
                collection.id === id ? { ...collection, expanded: !collection.expanded } : collection
            )
        );
    };

    if (loading) {
        return <LoadingComponent />;
    }

    if (collections.length === 0) {
        return <div>No collections found.</div>;
    }

    return (
        <SongContainer>
            <h2>Song Collections</h2>
            {collections.map((collection) => (
                <div key={collection.id}>
                    <SongListContainer>
                        <h3 onClick={() => toggleSongDetails(collection.id)}>
                            {collection.songCollectionTitle}
                        </h3>
                        {collection.expanded && (
                            <>
                                <ul>
                                    <ImageContainer>
                                        {renderImage(collection)}
                                    </ImageContainer>
                                </ul>
                                <h3>Songs in collection:</h3>
                                <ul>
                                    {collection.songIds.map((song) => (
                                        <li key={song.id}>
                                            {song.songTitle}, {song.artistName}
                                        </li>
                                    ))}
                                </ul>
                                {showActions && (
                                    <button onClick={() => handleToggleVisibility(collection)}>
                                        {collection.isPublic ? 'Make Private' : 'Make Public'}
                                    </button>
                                )}
                            </>
                        )}
                    </SongListContainer>
                </div>
            ))}
        </SongContainer>
    );
}

export default SongCollectionList;

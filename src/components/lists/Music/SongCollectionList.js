import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SongContainer, SongListContainer, ImageContainer, Image } from './styles.SongCollectionList';
import ImageForm from "../../forms/imageForm/ImageForm";

function SongCollectionList() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songCollections');
            console.log('Response from backend:', response.data);
            setCollections(response.data);
        } catch (error) {
            console.error('Error fetching collections!', error);
        }
    };

    const renderImage = (image) => {
        if (image) {
            return <Image src={image} alt="Collection Image" />;
        } else {
            return <ImageForm onImageUploaded={handleImageUploaded} />;
        }
    };

    const handleImageUploaded = (uploadedImage) => {
        // Handle the uploaded image data here
        console.log("Image uploaded:", uploadedImage);
        // You can then update the state with the uploaded image if needed
    };

    return (
        <SongContainer>
            <h2>Song Collections</h2>
            {collections.map((collection) => (
                <div key={collection.id}>
                    <SongListContainer>
                        <h3>{collection.songCollectionTitle}</h3>
                        <ul>
                            <ImageContainer>
                                {renderImage(collection.image)}
                            </ImageContainer>
                        </ul>
                        <ul>
                            {collection.songIds.map((song) => (
                                <li key={song.id}>{song.songTitle}</li>
                            ))}
                        </ul>
                    </SongListContainer>
                </div>
            ))}
        </SongContainer>
    );
}

export default SongCollectionList;

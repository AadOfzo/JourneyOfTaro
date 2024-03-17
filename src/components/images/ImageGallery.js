import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await axios.get('http://localhost:8080/images');
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        fetchImages();
    }, []);

    return (
        <div>
            <h2>Image Gallery</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {images.map((image) => (
                    <div key={image.id} style={{ width: '300px', border: '1px solid #ccc', padding: '10px' }}>
                        <img src={image.imageUrl} alt={image.imageAltName} style={{ maxWidth: '100%' }} />
                        <p>Image Name: {image.imageName}</p>
                        <p>Alt Name: {image.imageAltName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;

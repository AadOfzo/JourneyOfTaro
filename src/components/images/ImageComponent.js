import React, { useState, useEffect } from 'react';
import axios from "axios";

const ImageComponent = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:8080/images');
                setImages(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            <h1>Image Gallery</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {images.length === 0 ? (
                        <p>No images found</p>
                    ) : (
                        <div>
                            {images.map((image) => (
                                <div key={image.id}>
                                    <img src={`http://localhost:8080/images/`} alt={image.imageName} />
                                    <p>{image.imageAltName}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageComponent;

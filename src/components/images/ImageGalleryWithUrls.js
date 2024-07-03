import React, { useState, useEffect } from 'react';
import ApiService from '../../configs/utilities/axios/ApiService';
import GongLogo from '../../assets/images/svg/JavaneseGamelan_Logo_GongOutline.svg';

const ImageGalleryWithUrls = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await ApiService.fetchImages();
            console.log('Fetched images:', response.data);
            setImages(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching images:', error);
            setError(error);
            setLoading(false);
        }
    };


    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = GongLogo;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="image-gallery">
            <h2>Image Gallery with URLs</h2>
            <div className="gallery">
                {images.map((image) => (
                    <div key={image.id} className="image-item">
                        <img
                            src={`http://localhost:8080${image.imageUrl}`}
                            alt={image.imageAltName || image.imageName}
                            className="gallery-image"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            onError={handleImageError}
                        />
                        <div className="image-info">
                            <h4>{image.imageName}</h4>
                            {/* Optionally display upload time or other information */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGalleryWithUrls;

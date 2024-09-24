import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../../configs/utilities/axios/ApiService';
import ApiService from '../../configs/utilities/axios/ApiService';
import GongLogo from '../../assets/images/svg/JavaneseGamelan_Logo_GongOutline.svg';

const ImageGalleryWithUrls = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            await fetchImages();
            await fetchUserData();
        };

        fetchData();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await ApiService.fetchImages();
            setImages(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await ApiService.fetchUserDetails();
            const userData = response.data;
            setUserName(userData.username);
            setUserRole(userData.role);
        } catch (error) {
            setError(error);
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
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGalleryWithUrls;

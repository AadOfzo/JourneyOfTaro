import React, { useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";
import ImageListBase64 from '../components/ImageListBase64';
import ImageGallery from '../components/ImageGallery';

const ImageManager = () => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await ApiService.fetchImages();
            setImages(response); // Assuming response is directly the array of images
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div>
            <ImageListBase64 images={images} fetchImages={fetchImages} />
            <ImageGallery images={images} />
        </div>
    );
};

export default ImageManager;

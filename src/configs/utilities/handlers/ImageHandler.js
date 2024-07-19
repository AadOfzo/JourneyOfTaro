import React, { useState, useEffect } from 'react';
import ApiService from "../axios/ApiService";
import { ImageContainer, Image } from '../../../components/forms/imageForm/styles.ImageForm';
import ImageForm from "../../../components/forms/imageForm/ImageForm";

const ImageHandler = ({ userId }) => {
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserImage = async () => {
            try {
                const image = await ApiService.getUserImage(userId);
                setImageData(image);
            } catch (error) {
                setError('Failed to fetch user image.');
            }
        };

        fetchUserImage();
    }, [userId]);

    return (
        <ImageContainer>
            {imageData ? (
                <Image src={`data:${imageData.mimeType};base64,${imageData.imageData}`} alt="User Image" />
            ) : (
                <>
                    {error && <p>{error}</p>}
                    <p>No image available</p>
                    <ImageForm userId={userId} />
                </>
            )}
        </ImageContainer>
    );
};

export default ImageHandler;

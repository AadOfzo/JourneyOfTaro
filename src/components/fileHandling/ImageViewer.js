import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const ImageContainer = styled.div`
  max-width: 100%;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

const ImageViewer = ({ imageId }) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/images/${imageId}`);
                setImageUrl(response.data.imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        if (imageId) {
            fetchImage().catch(error => console.error('Error in fetchImage:', error));
        }
    }, [imageId]);

    return (
        <ImageContainer>
            {imageUrl ? (
                <StyledImage src={imageUrl} alt="Uploaded" />
            ) : (
                <p>No image uploaded</p>
            )}
        </ImageContainer>
    );
};

export default ImageViewer;

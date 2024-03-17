import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  max-width: 100%;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  max-width: 100%;
`;

const ImageViewer = ({ imageUrl, imageName }) => {
    return (
        <ImageContainer>
            {imageUrl ? (
                <StyledImage src={`http://localhost:8080/images/${imageName}`} alt="Uploaded" />
            ) : (
                <p>No image uploaded</p>
            )}
        </ImageContainer>
    );
};

export default ImageViewer;

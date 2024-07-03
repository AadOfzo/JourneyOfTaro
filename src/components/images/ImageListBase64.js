import React, { useState, useEffect } from "react";
import ApiService from "../../configs/utilities/axios/ApiService";
import {
    Container,
    PreviewImage,
    ImageListOuterContainer,
    ImageListInnerContainer,
    ImageListTitle,
    ImageLabel,
    ImageListItem,
    ImageName,
    ImageDeleteButton,
} from "../forms/imageForm/styles.ImageForm";

const ImageListBase64 = () => {
    const [images, setImages] = useState([]);

    const fetchImages = async () => {
        try {
            const response = await ApiService.fetchImages();
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await ApiService.deleteImage(id);
            await fetchImages(); // Refresh the image list after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const getImageSrc = (image) => {
        let mimeType;
        const extension = image.imageName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'jpeg':
            case 'jpg':
                mimeType = 'image/jpeg';
                break;
            case 'png':
                mimeType = 'image/png';
                break;
            default:
                mimeType = 'application/octet-stream';
                break;
        }
        return `data:${mimeType};base64,${image.imageData}`;
    };

    return (
        <Container>
            <ImageListOuterContainer>
                <ImageListTitle>Image List</ImageListTitle>
                <ImageListInnerContainer>
                    {images.map((image) => (
                        <ImageListItem key={image.id}>
                            <ImageLabel>
                                <PreviewImage src={getImageSrc(image)} alt={image.imageAltName || image.imageName} />
                                <ImageName>{image.imageName}</ImageName>
                            </ImageLabel>
                            <ImageDeleteButton onClick={() => handleDelete(image.id)}>Delete</ImageDeleteButton>
                        </ImageListItem>
                    ))}
                </ImageListInnerContainer>
            </ImageListOuterContainer>
        </Container>
    );
};

export default ImageListBase64;

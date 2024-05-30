import React, { useState, useEffect } from "react";
import axios from "axios";
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

const ImageList = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/images`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/images/${id}`);
            await fetchImages(); // Refresh image list after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <Container>
            <ImageListOuterContainer>
                <ImageListTitle>Image List</ImageListTitle>
                <ImageListInnerContainer>
                    {images.map((image) => (
                        <ImageListItem key={image.id}>
                            <ImageLabel>
                                <PreviewImage src={`data:image/png;base64,${image.imageData}`} alt={image.id} />
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

export default ImageList;

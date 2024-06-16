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

const ImageList = () => {
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
            await fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

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

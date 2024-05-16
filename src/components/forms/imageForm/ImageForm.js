import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    PreviewImage,
    LoadingWheel,
    UploadPreviewImage,
    ImageName,
    ImageDeleteButton,
    ImageListContainer,
    ImageList,
    ImageListTitle,
    ImageLabel,
    ImageListItem,
    ImageAddButton,
} from './styles.ImageForm';
import styled from "styled-components";

const ImageForm = () => {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchImages();
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchData();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/images`);
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        setFormData({ ...formData, file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const file = formData.file;

            if (!file) {
                console.error('No file selected');
                setLoading(false);
                return;
            }

            const imageName = file.name;
            const imageAltName = imageName.toLowerCase().replace(/\s+/g, '_');

            const formDataToSend = new FormData();
            formDataToSend.append('imageName', imageName);
            formDataToSend.append('imageAltName', imageAltName);
            formDataToSend.append('file', file);

            await axios.post('http://localhost:8080/fileUpload', formDataToSend);

            await fetchImages();
            setFormData({ file: null }); // Clear field after upload
            setLoading(false);
        } catch (error) {
            console.error('Error adding image:', error);
            setLoading(false);
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
            <ImageListContainer>
            <ImageListTitle>Upload Image</ImageListTitle>
            <Form
                onSubmit={handleSubmit}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                dragOver={dragOver}
            >
                {!formData.file && (
                    <>
                        <FileInput
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleFileChange}
                        />
                        <ChooseFileButton
                            htmlFor="file"
                            dragOver={dragOver}
                        >
                            <PlusIcon>+</PlusIcon> {dragOver ? 'Drop here' : 'Choose File'}
                        </ChooseFileButton>
                    </>
                )}
                {loading && <LoadingWheel />}
                {formData.file && <UploadPreviewImage src={URL.createObjectURL(formData.file)} alt="Preview" />}
                {formData.file && <ImageAddButton type="submit">Upload</ImageAddButton>}
            </Form>
            </ImageListContainer>

            <ImageListContainer>
                <ImageListTitle>Image List</ImageListTitle>
                <ImageList>
                    {images.map((image) => (
                        <ImageListItem key={image.id}>
                            <ImageLabel>
                                <PreviewImage src={`data:image/png;base64, ${image.imageData}`} alt={image.id}/>
                                <ImageName>{image.imageName}</ImageName>
                            </ImageLabel>
                            <ImageDeleteButton onClick={() => handleDelete(image.id)}>Delete</ImageDeleteButton>
                        </ImageListItem>
                    ))}
                </ImageList>
            </ImageListContainer>
        </Container>
    );
};

export default ImageForm;


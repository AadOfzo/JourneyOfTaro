// ImageForm.js
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
} from './styles.ImageForm';

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
            const response = await axios.get('http://localhost:8080/images');
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

            await axios.post('http://localhost:8080/images', formDataToSend);

            await fetchImages();
            setFormData({ file: null }); // Clear the file after upload
            setLoading(false);
        } catch (error) {
            console.error('Error adding image:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/images/${id}`);
            await fetchImages(); // Refresh the image list after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <Container>
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
                {formData.file && <PreviewImage src={URL.createObjectURL(formData.file)} alt="Preview" />}
                {formData.file && <button type="submit">Add Image</button>}
            </Form>

            <h2>Image List</h2>
            <ul>
                {images.map((image) => (
                    <li key={image.id}>
                        <div>
                            <img
                                src={`http://localhost:8080/images/${image.imageName}`}
                                alt={image.imageAltName}
                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                            />
                            <div>{image.imageName}</div>
                            <button onClick={() => handleDelete(image.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default ImageForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageForm = () => {
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        imageName: '',
        imageAltName: '',
        file: null,
    });

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/images');
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('imageName', formData.imageName);
            formDataToSend.append('imageAltName', formData.imageAltName);
            formDataToSend.append('file', formData.file);

            // Axios will handle setting the correct Content-Type for you
            await axios.post('http://localhost:8080/images', formDataToSend);

            // Refresh the image list after adding a new one
            fetchImages();
        } catch (error) {
            console.error('Error adding image:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/images/${id}`);
            fetchImages(); // Refresh the image list after deletion
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Image Name:
                    <input
                        type="text"
                        name="imageName"
                        value={formData.imageName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Image Alt Name:
                    <input
                        type="text"
                        name="imageAltName"
                        value={formData.imageAltName}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Image File:
                    <input type="file" name="file" onChange={handleFileChange} />
                </label>
                <br />
                <button type="submit">Add Image</button>
            </form>

            <h2>Image List</h2>
            <ul>
                {images.map((image) => (
                    <li key={image.id}>
                        {image.imageName} - {image.imageAltName}
                        <button onClick={() => handleDelete(image.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ImageForm;

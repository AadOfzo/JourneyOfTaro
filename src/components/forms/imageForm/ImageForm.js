import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    UploadPreviewImage,
    ImageAddButton,
    LoadingWheel
} from './styles.ImageForm';

const ImageForm = ({ songId, onImageUploaded }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.error("No file selected");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`http://localhost:8080/fileUpload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (onImageUploaded) {
                onImageUploaded();
            }
            setFile(null);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return (
        <Container style={{ width: '100%', padding: '10px' }}>
            <Form onSubmit={handleSubmit} style={{ width: '100%', padding: '10px', border: 'none' }}>
                <FileInput type="file" onChange={handleFileChange} id={`file-${songId}`} />
                <ChooseFileButton htmlFor={`file-${songId}`} style={{ height: '50px', fontSize: '12px' }}>
                    <PlusIcon>+</PlusIcon> Choose File
                </ChooseFileButton>
                {file && <UploadPreviewImage src={URL.createObjectURL(file)} alt="Preview" style={{ maxWidth: '50px', maxHeight: '50px' }} />}
                {file && <ImageAddButton type="submit" style={{ padding: '5px 10px', fontSize: '12px' }}>Upload</ImageAddButton>}
                {loading && <LoadingWheel />}
            </Form>
        </Container>
    );
};

export default ImageForm;

import React, { useState } from 'react';
import ApiService from "../../../configs/utilities/axios/ApiService";
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

const ImageForm = ({ onImageUploaded }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setUploaded(false); // Reset the uploaded state when a new file is selected
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
            await ApiService.uploadImage(formData);
            if (onImageUploaded) {
                onImageUploaded();
            }
            setFile(null);
            setLoading(false);
            setUploaded(true); // Set the uploaded state to true after successful upload
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FileInput type="file" onChange={handleFileChange} id="file-input" />
                {!file ? (
                    <ChooseFileButton htmlFor="file-input">
                        <PlusIcon>+</PlusIcon> Choose File
                    </ChooseFileButton>
                ) : (
                    <>
                        <UploadPreviewImage
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className={uploaded ? 'uploaded' : ''}
                        />
                        <ImageAddButton type="submit">Upload</ImageAddButton>
                    </>
                )}
                {loading && <LoadingWheel />}
            </Form>
        </Container>
    );
};

export default ImageForm;

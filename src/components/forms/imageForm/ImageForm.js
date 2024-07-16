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

const ImageForm = ({ userId, onImageUploaded }) => {
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [uploaded, setUploaded] = useState(false);  // Define uploaded state
    const [loading, setLoading] = useState(false);    // Define loading state

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setErrorMessage('Please select a file first.');
            return;
        }

        setLoading(true); // Set loading to true before starting the upload

        try {
            const response = await ApiService.addImageToUser(userId, file);
            setSuccessMessage('Image uploaded successfully.');
            setErrorMessage('');
            setUploaded(true); // Set uploaded to true after successful upload
            onImageUploaded(); // Notify parent component
        } catch (error) {
            setErrorMessage('Error uploading image: ' + error.message);
        } finally {
            setLoading(false); // Set loading to false after the upload is done
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

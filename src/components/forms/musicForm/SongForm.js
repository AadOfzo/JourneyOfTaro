import React, { useState } from 'react';
import ApiService from "../../../configs/utilities/axios/ApiService";
import {
    SongContainer,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    SongUploadLabel,
    SongUploadButton,
    StyledInput,
} from './styles.SongForm';
import LoadingComponent from "../../loadingWheel/LoadingComponent";
import { useAuth } from '../../authentication/Auth';

const SongForm = () => {
    const { token } = useAuth();
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
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
            console.error('No file selected');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('songTitle', songTitle);
        formData.append('artistName', artistName);

        try {
            await ApiService.uploadSong(formData);
            setFile(null);
            setLoading(false);
            setUploaded(true); // Set the uploaded state to true after successful upload
        } catch (error) {
            console.error('Error uploading song:', error);
            setLoading(false);
        }
    };

    return (
        <SongContainer>
            <Form onSubmit={handleSubmit}>
                <FileInput type="file" onChange={handleFileChange} id="file-input" />
                {!file ? (
                    <ChooseFileButton htmlFor="file-input">
                        <PlusIcon>+</PlusIcon> Choose File
                    </ChooseFileButton>
                ) : (
                    <>
                        <SongUploadLabel>
                            Song Title:
                            <StyledInput
                                type="text"
                                value={songTitle}
                                onChange={(e) => setSongTitle(e.target.value)}
                            />
                        </SongUploadLabel>
                        <SongUploadLabel>
                            Artist Name:
                            <StyledInput
                                type="text"
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                            />
                        </SongUploadLabel>
                        <SongUploadButton type="submit">Upload</SongUploadButton>
                    </>
                )}
                {loading && <LoadingComponent />}
            </Form>
        </SongContainer>
    );
};

export default SongForm;

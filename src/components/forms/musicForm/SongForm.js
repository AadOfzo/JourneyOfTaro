import React, { useState } from 'react';
import axios from 'axios';
import {
    SongContainer,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    SongUploadLabel,
    SongUploadContainer,
    SongListTitle,
    SongUploadButton,
    StyledInput,
} from './styles.SongForm';
import LoadingComponent from "../../loadingWheel/LoadingComponent";

const SongForm = () => {
    const [songs, setSongs] = useState([]);
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [formData, setFormData] = useState({ file: null });
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/songs');
            setSongs(response.data);
        } catch (error) {
            console.error('Error fetching songs:', error);
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

            const formDataToSend = new FormData();
            formDataToSend.append('file', file);
            formDataToSend.append('songTitle', songTitle);
            formDataToSend.append('artistName', artistName);

            await axios.post('http://localhost:8080/fileUpload', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            await fetchSongs();
            setFormData({ file: null });
            setSongTitle('');
            setArtistName('');
            setLoading(false);
        } catch (error) {
            console.error('Error uploading song:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/songs/${id}`);
            await fetchSongs();
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <SongContainer>
            <SongUploadContainer>
                <SongListTitle>Upload Song</SongListTitle>
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
                    {loading && <LoadingComponent />}
                    {formData.file && <SongUploadButton type="submit">Upload Song</SongUploadButton>}
                    {formData.file && <SongUploadLabel>Selected file: {formData.file.name}</SongUploadLabel>}
                    <StyledInput
                        type="text"
                        value={songTitle}
                        placeholder="Enter song title"
                        onChange={(e) => setSongTitle(e.target.value)}
                    />
                    <StyledInput
                        type="text"
                        value={artistName}
                        placeholder="Enter artist name"
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                </Form>
            </SongUploadContainer>
        </SongContainer>
    );
};

export default SongForm;

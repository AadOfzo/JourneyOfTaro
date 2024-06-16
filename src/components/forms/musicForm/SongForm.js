import React, { useState } from 'react';
import ApiService from "../../../configs/utilities/axios/ApiService";
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
import {
    fetchSongs,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleFileChange
} from "../../../configs/utilities/FileUtilities";

const SongForm = () => {
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [formData, setFormData] = useState({ file: null });
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

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

            await ApiService.uploadSong(formDataToSend);
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

    return (
        <SongContainer>
            <SongUploadContainer>
                <SongListTitle>Upload Song</SongListTitle>
                <Form
                    onSubmit={handleSubmit}
                    onDragEnter={(e) => handleDragEnter(e, setDragOver)}
                    onDragLeave={(e) => handleDragLeave(e, setDragOver)}
                    onDrop={(e) => handleDrop(e, setDragOver, setFormData, formData)}
                    dragOver={dragOver}
                >
                    {!formData.file && (
                        <>
                            <FileInput
                                type="file"
                                name="file"
                                id="file"
                                onChange={(e) => handleFileChange(e, setFormData, formData)}
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

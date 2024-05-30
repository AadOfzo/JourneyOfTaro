import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    SongContainer,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    LoadingWheel,
    UploadPreviewSong,
    SongUploadLabel,
    SongTitle,
    ArtistName,
    SongListContainer,
    SongList,
    SongListTitle,
    SongLabel,
    SongListItem,
    SongUploadButton,
    SongActionButtons,
    SongAddButton,
    SongDeleteButton,
    AudioPlayerContainer,
} from './styles.SongForm';
import { IconContext } from 'react-icons';

const SongForm = () => {
    const [songs, setSongs] = useState([]);
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [formData, setFormData] = useState({ file: null });
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchSongs();
            } catch (error) {
                console.error('Error fetching songs: ', error);
            }
        };
        fetchData();
    }, []);

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

    const handleAddSong = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/songs/${id}`);
            await fetchSongs();
        } catch (error) {
            console.error('Error Adding song:', error);
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
            <SongListContainer>
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
                    {loading && <LoadingWheel />}
                    {formData.file && <UploadPreviewSong
                        src={URL.createObjectURL(formData.file)}
                        alt="Preview" />}
                    {formData.file && <SongUploadButton type="submit">Upload Song</SongUploadButton>}
                    {formData.file && <SongUploadLabel>Selected file: {formData.file.name}</SongUploadLabel>}
                    <input
                        type="text"
                        value={songTitle}
                        placeholder="Enter song title"
                        onChange={(e) => setSongTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={artistName}
                        placeholder="Enter artist name"
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                </Form>
            </SongListContainer>

            <SongListContainer>
                <SongListTitle>Song List</SongListTitle>
                <SongList>
                    {songs.map((song) => (
                        <SongListItem key={song.id}>
                            <SongLabel>
                                <IconContext.Provider value={{ size: '2em', color: 'var(--primary)' }}>
                                    <AudioPlayerContainer>
                                            <audio controls>
                                                <source src={`data:audio/mp3;base64,${song.songData}`} type="audio/mp3"/>
                                                Your browser does not support the audio element.
                                            </audio>
                                    </AudioPlayerContainer>
                                </IconContext.Provider>
                                <SongTitle>{song.songTitle}</SongTitle>
                                <ArtistName>{song.artistName}</ArtistName>
                            </SongLabel>
                            <SongActionButtons>
                            <SongAddButton onClick={() => handleAddSong(song.id)}>Add</SongAddButton>
                            <SongDeleteButton onClick={() => handleDelete(song.id)}>Delete</SongDeleteButton>
                            </SongActionButtons>
                        </SongListItem>
                    ))}
                </SongList>
            </SongListContainer>
        </SongContainer>
    );
};

export default SongForm;

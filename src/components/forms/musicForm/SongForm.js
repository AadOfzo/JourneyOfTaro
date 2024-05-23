import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
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
    SongAddButton,
    SongDeleteButton,
    IconButton,
} from './styles.SongForm';
import { AiFillPlayCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';

const SongForm = ({ onPlayPause }) => {
    const [ songs, setSongs ] = useState([
        { id: 1, songTitle: 'Song 1', artistName: 'Artist 1', songData: 'base64encodedSongData1' },
        { id: 2, songTitle: 'Song 2', artistName: 'Artist 2', songData: 'base64encodedSongData2' }
    ]);
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

            console.log('Form Data:', formDataToSend);

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
            console.log('Song added successfully!');
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
        <Container>
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
                    {formData.file && <SongAddButton type="submit">Upload Song</SongAddButton>}
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
                                    <IconButton onClick={() => onPlayPause(song)}>
                                        <AiFillPlayCircle />
                                    </IconButton>
                                </IconContext.Provider>
                                <SongTitle>{song.songTitle}</SongTitle>
                                <ArtistName>{song.artistName}</ArtistName>
                            </SongLabel>
                            <SongDeleteButton onClick={() => handleDelete(song.id)}>Delete</SongDeleteButton>
                        </SongListItem>
                    ))}
                </SongList>
            </SongListContainer>
        </Container>
    );
};

export default SongForm;

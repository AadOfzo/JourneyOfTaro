import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Container,
    Form,
    FileInput,
    ChooseFileButton,
    PlusIcon,
    PreviewSongs,
    LoadingWheel,
    SongListContainer,
    SongListTitle,
} from './styles.SongForm';
import SongList from "../../lists/SongList";

const SongForm = () => {
    const [songs, setSongs] = useState([]);
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState(''); // State for artist's name
    const [formData, setFormData] = useState({file: null});
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
            formDataToSend.append('artistName', artistName); // Add artist's name to the form data

            console.log('Form Data:', formDataToSend);

            await axios.post('http://localhost:8080/fileUpload', formDataToSend);

            await fetchSongs();
            setFormData({file: null}); // Clear field after upload
            setSongTitle(''); // Clear song title
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
            await fetchSongs(); // Refresh data list after deletion
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <Container>
            <Form
                onSubmit={handleSubmit}
                onDragEnter={() => setDragOver(true)}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files[0];
                    setFormData({...formData, file});
                }}
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
                {loading && <LoadingWheel/>}
                {formData.file && (
                    <>
                        <PreviewSongs
                            src={URL.createObjectURL(formData.file)}
                            alt="Preview"
                        />
                        <p>Selected song: {formData.file.name}</p>
                    </>
                )}
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
                {formData.file && <button type="submit">Add Song</button>}
            </Form>

            <SongListContainer>
                <SongListTitle>Song List</SongListTitle>
                <SongList>
                    {songs.map((song) => (
                        <li key={song.id}>
                            <div>
                                <div>{song.songTitle}</div>

                                <button onClick={() => handleDelete(song.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </SongList>
            </SongListContainer>
        </Container>
    );
};

export default SongForm;

import React, { useState } from 'react';
import axios from 'axios';
import ImageViewer from "./ImageViewer";

function FileUploadComponent() {
    const [file, setFile] = useState(null);
    const [imageName, setImageName] = useState(''); // Define imageName state
    const [imageAltName, setImageAltName] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('imageName', imageName);
            formData.append('imageAltName', imageAltName);

            const response = await axios.post('http://localhost:8080/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Image upload successful:', response.data);
            setImageUrl(response.data.imageUrl);
            setFile(null);
            setImageName('');
            setImageAltName('');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleSongUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('songTitle', songTitle);
            formData.append('artist', artist);

            const response = await axios.post('http://localhost:8080/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Song upload successful:', response.data);
            setAudioUrl(response.data.audioUrl);
            // Reset state after successful upload
            setFile(null);
            setSongTitle('');
            setArtist('');
        } catch (error) {
            console.error('Error uploading song:', error);
        }
    };

    return (
        <div>
            <h2>Upload Image</h2>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Image Name" value={imageName} onChange={(e) => setImageName(e.target.value)} />
            <input type="text" placeholder="Image Alt Name" value={imageAltName} onChange={(e) => setImageAltName(e.target.value)} />
            <button onClick={handleImageUpload}>Upload Image</button>
            {imageUrl && <ImageViewer imageUrl={imageUrl} />} {/* Render ImageViewer component */}

            <h2>Upload Song</h2>
            <input type="text" placeholder="Song Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} />
            <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
            <button onClick={handleSongUpload}>Upload Song</button>
            {audioUrl && (
                <audio controls>
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
}

export default FileUploadComponent;

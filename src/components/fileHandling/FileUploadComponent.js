import React, { useState } from 'react';
import axios from 'axios';

function FileUploadComponent() {
    const [file, setFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageAltName, setImageAltName] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (file, fileType, additionalData, onSuccess, onError) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            Object.entries(additionalData).forEach(([key, value]) => {
                formData.append(key, value);
            });

            const response = await axios.post('http://localhost:8080/fileUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            onSuccess(response.data);
        } catch (error) {
            onError(error);
        }
    };

    const handleImageUpload = async () => {
        const additionalData = {
            imageName: imageName,
            imageAltName: imageAltName,
            artistName: artistName
        };

        handleFileUpload(
            file,
            'Image',
            additionalData,
            (data) => {
                setImageUrl(data.imageUrl);
                // Reset state after successful upload
                setFile(null);
                setImageName('');
                setImageAltName('');
                alert('Image uploaded successfully!');
            },
            (error) => {
                console.error('Error uploading image:', error);
                alert('Error uploading image: ' + error);
            }
        );
    };

    const handleSongUpload = async () => {
        const additionalData = {
            songTitle: songTitle,
            artistName: artistName
        };

        handleFileUpload(
            file,
            'Audio',
            additionalData,
            (data) => {
                setAudioUrl(data.audioUrl);
                // Reset state after successful upload
                setFile('');
                setSongTitle('');
                setArtistName('');
                alert('Song uploaded successfully!');
            },
            (error) => {
                console.error('Error uploading song:', error);
                alert('Error uploading song: ' + error);
            }
        );
    };


    return (
        <div>
            <h2>Upload Image</h2>
            <input type="file" onChange={handleFileChange} />
            <input type="text" placeholder="Image Name" value={imageName} onChange={(e) => setImageName(e.target.value)} />
            <input type="text" placeholder="Image Alt Name" value={imageAltName} onChange={(e) => setImageAltName(e.target.value)} />
            <button onClick={handleImageUpload}>Upload Image</button>
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}

            <h2>Upload Song</h2>
            <input type="text" placeholder="Song Title" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} />
            <input type="text" placeholder="Artist" value={artistName} onChange={(e) => setArtistName(e.target.value)} />
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

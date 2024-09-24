import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Form,
  FileInput,
  ChooseFileButton,
  PlusIcon,
  PreviewImage,
  LoadingWheel,
} from '../imageForm/styles.ImageForm'; // Update import path if necessary

const UploadForm = () => {
  const [images, setImages] = useState([]);
  const [songs, setSongs] = useState([]);
  const [imageFormData, setImageFormData] = useState({ file: null });
  const [songFormData, setSongFormData] = useState({ file: null });
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [artistName, setArtistName] = useState(''); // State for artist's name

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchImages();
        await fetchSongs();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:8080/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/songs');
      setSongs(response.data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const handleFileChange = (e, setFormData) => {
    setFormData({
      ...setFormData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e, formData, setFormData, fetchFunction) => {
    e.preventDefault();

    try {
      setLoading(true);

      const file = formData.file;

      if (!file) {
        console.error('No file selected');
        setLoading(false);
        return;
      }

      const fileName = file.name;
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('fileName', fileName);
      formDataToSend.append('artistName', artistName); // Add artist's name to the form data

      await axios.post('http://localhost:8080/fileUpload', formDataToSend);

      await fetchFunction();
      setFormData({ file: null }); // Clear field after upload
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, fetchFunction) => {
    try {
      await axios.delete(`http://localhost:8080/images/${id}`);
      await fetchFunction(); // Refresh data list after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <Container>
      <Form
        onSubmit={(e) => handleSubmit(e, imageFormData, setImageFormData, fetchImages)}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          setImageFormData({ ...imageFormData, file });
        }}
        dragOver={dragOver}
      >
        {!imageFormData.file && (
          <>
            <FileInput
              type="file"
              name="file"
              id="file"
              onChange={(e) => handleFileChange(e, setImageFormData)}
            />
            <ChooseFileButton htmlFor="file" dragOver={dragOver}>
              <PlusIcon>+</PlusIcon> {dragOver ? 'Drop here' : 'Choose File'}
            </ChooseFileButton>
          </>
        )}
        {loading && <LoadingWheel />}
        {imageFormData.file && (
          <PreviewImage src={URL.createObjectURL(imageFormData.file)} alt="Preview" />
        )}
        {imageFormData.file && <button type="submit">Add Image</button>}
      </Form>

      <h2>Image List</h2>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <div>
              <img
                src={`http://localhost:8080/images/${image.imageName}`}
                alt={image.imageName}
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
              <div>{image.imageName}</div>
              <button onClick={() => handleDelete(image.id, fetchImages)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <Form
        onSubmit={(e) => handleSubmit(e, songFormData, setSongFormData, fetchSongs)}
        onDragEnter={() => setDragOver(true)}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          setSongFormData({ ...songFormData, file });
        }}
        dragOver={dragOver}
      >
        {!songFormData.file && (
          <>
            <FileInput
              type="file"
              name="file"
              id="file"
              onChange={(e) => handleFileChange(e, setSongFormData)}
            />
            <ChooseFileButton htmlFor="file" dragOver={dragOver}>
              <PlusIcon>+</PlusIcon> {dragOver ? 'Drop here' : 'Choose File'}
            </ChooseFileButton>
          </>
        )}
        {loading && <LoadingWheel />}
        {songFormData.file && <p>Selected song: {songFormData.file.name}</p>}
        {songFormData.file && <button type="submit">Add Song</button>}
      </Form>

      <h2>Song List</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <div>
              <div>{song.songTitle}</div>
              <button onClick={() => handleDelete(song.id, fetchSongs)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default UploadForm;

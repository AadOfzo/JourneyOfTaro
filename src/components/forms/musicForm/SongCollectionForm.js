/* eslint-disable no-console */
// SongCollectionForm.js
import { useState } from 'react';
import axios from 'axios';

const SongCollectionForm = () => {
  const [collectionName, setCollectionName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add logic to post the song collection data to your backend
      await axios.post('http://localhost:8080/songCollections', {
        songCollectionName: collectionName,
      });

      // Add additional logic to update song collection, add image, etc.

      console.log('Song collection added successfully!');
    } catch (error) {
      console.error('Error adding song collection:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Song Collection Name:
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
      </label>
      <button type="submit">Add Song Collection</button>
    </form>
  );
};

export default SongCollectionForm;

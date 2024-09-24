import React, { useState } from "react";
import { handleImageUpload, handleSongUpload } from "./handleFileUpload";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imageAltName, setImageAltName] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSongChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUploadClick = async () => {
    try {
      const data = await handleImageUpload(file, imageName, imageAltName);
      // Handle successful image upload
      console.log("Image upload successful:", data);
    } catch (error) {
      // Handle error
      console.error("Error uploading image:", error);
    }
  };

  const handleSongUploadClick = async () => {
    try {
      const data = await handleSongUpload(file, songTitle, artistName);
      // Handle successful song upload
      console.log("Song upload successful:", data);
    } catch (error) {
      // Handle error
      console.error("Error uploading song:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Image Name"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image Alt Name"
        value={imageAltName}
        onChange={(e) => setImageAltName(e.target.value)}
      />
      <button onClick={handleImageUploadClick}>Upload Image</button>

      <h2>Upload Song</h2>
      <input type="file" onChange={handleSongChange} />
      <input
        type="text"
        placeholder="Song Title"
        value={songTitle}
        onChange={(e) => setSongTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <button onClick={handleSongUploadClick}>Upload Song</button>
    </div>
  );
};

export default UploadComponent;

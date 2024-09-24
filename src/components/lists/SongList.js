import React, { useEffect, useState } from "react";
import ApiService from "../../configs/utilities/axios/ApiService";
import {
  ArtistName,
  AudioPlayerContainer,
  GlowingRow,
  SongContainer,
  SongListContainer,
  SongListItem,
  SongTitle,
} from "./Music/styles.SongList";
import {
  SongActionButtons,
  SongAddButton,
  SongDeleteButton,
} from "../buttons/styles.Buttons";
import SongCollectionManager from "./Music/SongCollectionManager";

function SongList() {
  const [songs, setSongs] = useState([]);
  const [setSongCollections] = useState([]);
  const [expandedSongId, setExpandedSongId] = useState(null);
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedSongs = await ApiService.fetchSongs();
        const fetchedCollections = await ApiService.fetchSongCollections();
        setSongs(fetchedSongs);
        setSongCollections(fetchedCollections);
      } catch (error) {
        console.error("Error fetching songs or collections: ", error);
      }
    };
    fetchData();
  }, [reload]);

  const handleAddSong = async (id) => {
    try {
      const song = songs.find((song) => song.id === id);
      if (!song) throw new Error("Song not found");

      const downloadUrl = await ApiService.getDownloadUrl(song.songTitle);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = song.songTitle; // Ensure this matches the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessage("Song downloaded successfully.");
    } catch (error) {
      console.error("Error downloading song:", error);
      setMessage("Error downloading song.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ApiService.deleteSong(id);
      setReload(!reload);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleAddSongToCollection = async (songId, collectionId) => {
    try {
      await ApiService.addSongToCollection(songId, collectionId);
      setMessage("Song added to collection successfully.");
      setReload(!reload);
    } catch (error) {
      setMessage("Error adding song to collection.");
      console.error("Error adding song to collection:", error);
    }
  };

  const handleReload = () => {
    setMessage("");
    setReload(!reload);
  };

  const toggleSongDetails = (id) => {
    if (expandedSongId === id) {
      setExpandedSongId(null);
    } else {
      setExpandedSongId(id);
    }
  };

  return (
    <SongContainer>
      <SongListContainer>
        <h1>Song List</h1>
        <table>
          <thead>
            <tr>
              <th>
                Please select an uploaded song in the list below to open
                options!
              </th>
            </tr>
            <tr>
              <th>Song Title</th>
              <th>Artist Name</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <React.Fragment key={song.id}>
                <SongListItem
                  as="tr"
                  onClick={() => toggleSongDetails(song.id)}
                >
                  <td>
                    <SongTitle>{song.songTitle}</SongTitle>
                  </td>
                  <td>
                    <ArtistName>{song.artistName}</ArtistName>
                  </td>
                </SongListItem>
                {expandedSongId === song.id && (
                  <GlowingRow>
                    <td colSpan="2">
                      <AudioPlayerContainer>
                        <audio controls>
                          <source
                            src={`data:audio/mp3;base64,${song.songData}`}
                            type="audio/mp3"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </AudioPlayerContainer>
                      <SongActionButtons>
                        <SongAddButton onClick={() => handleAddSong(song.id)}>
                          Download
                        </SongAddButton>
                        <SongDeleteButton onClick={() => handleDelete(song.id)}>
                          Delete
                        </SongDeleteButton>
                      </SongActionButtons>
                      <SongCollectionManager songs={[song]} />
                      {message && <p>{message}</p>}
                    </td>
                  </GlowingRow>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </SongListContainer>
    </SongContainer>
  );
}

export default SongList;

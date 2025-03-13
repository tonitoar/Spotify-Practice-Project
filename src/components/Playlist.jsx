import PropTypes from "prop-types";
import { useState } from "react";
import Track from "./Track";

//COMPONENT 
import Button from "../ui/Button";

//CSS
import styles from "../styles/Playlist.module.css"; 

export default function Playlist({ customPlaylist, setCustomPlaylist, token }) {
  const [playlistName, setPlaylistName] = useState("My Playlist");

  // Remove track from playlist
  function removeMusic(id) {
    setCustomPlaylist((oldList) => oldList.filter((song) => song.id !== id));
  }

  // Function to fetch the user’s Spotify ID
  async function getUserId() {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.id; // Return the user ID
  }

  // Function to create a new playlist on the user's account
  async function createPlaylist(userId) {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playlistName, // Playlist name from the state
        description: "Custom playlist created from Jammming",
        public: false, // Set to false or true depending on your preference
      }),
    });
    const data = await response.json();
    return data.id; // Return the newly created playlist ID
  }

  // Function to add tracks to the newly created playlist
  async function addTracksToPlaylist(userId, playlistId, trackUris) {
    // Convert full URLs to Spotify track URIs
    const trackIds = trackUris.map(uri => {
      const regex = /https:\/\/open.spotify.com\/track\/([a-zA-Z0-9]+)/;
      const match = uri.match(regex);
      return match ? `spotify:track:${match[1]}` : null;
    }).filter(uri => uri !== null);  // Filter out invalid URIs
  
    console.log("Adding the following track URIs:", trackIds);
  
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackIds, // Array of track URIs in the correct format
      }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      console.error("Error adding tracks to playlist:", data);
    }
  
    return data; // Return the response
  }
  
  

  // Handle saving the playlist to Spotify
  async function handleSubmit(e) {
    e.preventDefault();

    // Collect all track URIs from the custom playlist
    const trackUris = customPlaylist.map((song) => song.uri);
    console.log("uri's", trackUris); 

    // Fetch user ID, create playlist, and add tracks
    try {
      const userId = await getUserId(); // Get the user's Spotify ID
      const playlistId = await createPlaylist(userId); // Create the playlist
      await addTracksToPlaylist(userId, playlistId, trackUris); // Add tracks to the playlist
      console.log("Playlist saved to Spotify!");
      setCustomPlaylist([]); // Reset the custom playlist after saving
    } catch (error) {
      console.error("Error saving playlist to Spotify:", error);
    }
  }

  return (
    <div className={styles.container}>
    <h2>New Custom Playlist</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
        className={styles.input}
          type="text"
          id="title"
          name="title"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        {customPlaylist.map((item) => (
          <div key={item.id} className={styles.song}>
            <Track music={item} />
            <Button type="button" text="-" onClick={() => removeMusic(item.id)}/>
          </div>
        ))}
        <Button text="Save to Spotify" type="submit" className={styles.button} />
      </form>
    </div>
  );
}

Playlist.propTypes = {
  customPlaylist: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      uri: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCustomPlaylist: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired, // The access token passed as a prop
};

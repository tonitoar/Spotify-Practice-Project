import PropTypes from "prop-types";
import { useState } from "react";

export default function Playlist() {

  const [playlistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault(); 
  }

  return(
    <>
        <form onSubmit={handleSubmit}>
        <input type="text" id="search" name="search" value={playlistName}/>
        <button type="submit">Save to Spotify</button>
        </form>
    </>
  ); 
}

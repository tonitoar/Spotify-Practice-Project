import PropTypes from "prop-types";
import { useState } from "react";

export default function Playlist() {

  const [playlistName, setPlayListName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([
    { name: "", artist: "", album: "", id: null },
  ]);

  function handleSubmit(e) {
    e.preventDefault(); 
  }

  return(
    <>
        <form onSubmit={handleSubmit}>
        <input type="text" id="search" name="search" placeholder="Title of the Playlist"/>
        <button type="submit">Save to Spotify</button>
        </form>
    </>
  ); 
}

import PropTypes from "prop-types";
import { useState } from "react";
import Track from "./Track";

export default function Playlist({ customPlaylist, setCustomPlaylist}) {

  const [playlistName, setPlaylistName] = useState("My Playlist");
  // const []; 


  function removeMusic(id) {
    setCustomPlaylist((oldList) => oldList.filter((song) => song.id !== id)); 
  }

  function handleSubmit(e) {
    e.preventDefault();

  //*Collect al URI's from the tracks
  const trackUris = customPlaylist.map((song) => song.uri); 
  console.log("Save to Spotify", trackUris); 
  
  //Reset the CustomPLaylist
  setCustomPlaylist([]); 
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" id="title" name="title" value={playlistName} onChange={(e)=> setPlaylistName(e.target.value)}/>
        {customPlaylist.map(item => (
          <div key={item.id}>
            <Track music={item} />
            <button type="button" onClick={() => removeMusic(item.id)}>-</button>
          </div>
        ))}
        <button type="submit">Save to Spotify</button>
      </form>
    </>
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
};

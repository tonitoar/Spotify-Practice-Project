import PropTypes from "prop-types";
import { useState } from "react";
import Track from "./Track";

export default function Playlist({ customPlaylist }) {
  const [playlistName] = useState("");
  // const [playlistTracks, setPlaylistTracks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" id="search" name="search" value={playlistName} />
        {customPlaylist.map(item => (
          <div key={item.id}>
            <Track music={item} />
            <button>-</button>
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
    })
  ).isRequired,
};

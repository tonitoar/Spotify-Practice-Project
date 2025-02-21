import { useState } from "react";

import TrackList from "./TrackList";
import Playlist from "./Playlist";

import PropTypes from "prop-types";

export default function SearchResults({ musicResults }) {

  const [customPlaylist, setCustomPlaylist] = useState([]);

  return (
    <>
      <h2>Results</h2>
      <TrackList musicResults={musicResults} setCustomPlaylist={setCustomPlaylist}/>
      {customPlaylist.length > 0 && <Playlist customPlaylist={customPlaylist} />}
    </>
  );
}

SearchResults.propTypes = {
  musicResults: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

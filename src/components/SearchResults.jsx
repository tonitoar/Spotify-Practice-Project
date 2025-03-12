import { useState } from "react";

import TrackList from "./TrackList";
import Playlist from "./Playlist";

import PropTypes from "prop-types";

//CSS
import styles from "../styles/SearchResults.module.css"

export default function SearchResults({ musicResults, token }) {

  const [customPlaylist, setCustomPlaylist] = useState([]);
  
  return (
    <div className={styles.container}>
      <TrackList musicResults={musicResults} setCustomPlaylist={setCustomPlaylist} />
      <Playlist customPlaylist={customPlaylist} setCustomPlaylist={setCustomPlaylist} token={token}/>
    </div>
  );
}

SearchResults.propTypes = {
  musicResults: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    })
  ).isRequired,
  token: PropTypes.string.isRequired,
};

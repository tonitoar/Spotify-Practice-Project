import { useState } from "react";

import TrackList from "./TrackList";
import Playlist from "./Playlist";

import PropTypes from "prop-types";

export default function SearchResults({ musicResults }) {

  const [customPlaylist, setCustomPlaylist] = useState([]);
  

  // useEffect(() => { 
  //   console.log("CUSTOM",customPlaylist);
  // }, [customPlaylist]);


  

  return (
    <>
      <h2>Results</h2>
      <TrackList musicResults={musicResults} setCustomPlaylist={setCustomPlaylist} />
      <Playlist customPlaylist={customPlaylist} setCustomPlaylist={setCustomPlaylist} />
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
      uri: PropTypes.string.isRequired,
    })
  ).isRequired,
};

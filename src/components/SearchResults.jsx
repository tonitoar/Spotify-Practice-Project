import TrackList from "./TrackList"; 

import PropTypes from "prop-types";

export default function SearchResults({musicResults}) {

    return(
        <>
            <h2>Results</h2>
            <TrackList musicResults={musicResults}/>
        </>
    ); 
}; 

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
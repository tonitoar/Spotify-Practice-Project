import PropTypes from "prop-types";
import Track from "./Track"; 

export default function TrackList({musicResults}) {
   
    return(
        <>
           <div>
                {musicResults.map(item => (
                    <Track key={item.id} music={item} />
                ))}
           </div>
        </>
    ); 
}

TrackList.propTypes = {
  musicResults: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};
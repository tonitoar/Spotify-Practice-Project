import PropTypes from "prop-types";
import Track from "./Track"; 

export default function TrackList({musicResults, setCustomPlaylist}) {
   
  console.log("CUSTOM:", setCustomPlaylist); 

    return(
        <>
           <div>
                {musicResults.map(item => (
                  <div key={item.id}>
                    <Track music={item} />
                    <button onClick={()=>  setCustomPlaylist(oldList => [...oldList, item])}>+</button>
                  </div>
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
  setCustomPlaylist:PropTypes.func.isRequired,
};
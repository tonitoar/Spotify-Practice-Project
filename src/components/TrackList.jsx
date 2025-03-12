import PropTypes from "prop-types";
import Track from "./Track";

//CSS
import styles from "../styles/Tracklist.module.css";

export default function TrackList({ musicResults, setCustomPlaylist }) {
  function addMusic(item) {
    setCustomPlaylist((oldList) => {
      if (!oldList.some((song) => song.id === item.id)) {
        // ✅ Prevent duplicates
        return [...oldList, item];
      }
      return oldList;
    });
  }

  return (
      <div className={styles.container}>
        <h2>Results</h2>
        {musicResults.map((item) => (
          <div key={item.id} className={styles.song}>
            <Track music={item} />
            <button onClick={() => addMusic(item)}>+</button>
          </div>
        ))}
      </div>
  );
}

TrackList.propTypes = {
  musicResults: PropTypes.arrayOf(
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

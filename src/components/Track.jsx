import PropTypes from "prop-types";

//CSS
import styles from "../styles/Track.module.css";

export default function Track({ music }) {
  
  return (
    <>
      <div className={styles.container}>
        <h3>{music.name}</h3>
        <div className={styles.info}>
          <p>{music.artist}</p>
          <p>{music.album}</p>
          <p className={styles.hidden}>{music.id}</p>
          <p className={styles.hidden}>{music.uri}</p>
        </div>
      </div>
    </>
  );
}

//Prop validation

Track.propTypes = {
  music: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      uri: PropTypes.string.isRequired,
    })
  ).isRequired,
};

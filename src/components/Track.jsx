import PropTypes from "prop-types";

export default function Track({ music }) {
  return (
    <>
      <div>
        <h3>{music.name}</h3>
        <p>{music.artist}</p>
        <p>{music.album}</p>
        <p>{music.id}</p>
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
    })
  ).isRequired,
};

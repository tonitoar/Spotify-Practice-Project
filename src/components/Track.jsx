import PropTypes from "prop-types";

export default function Track({ result }) {
  return (
    <>
      <div>
        <h3>{result.name}</h3>
        <p>{result.artist}</p>
        <p>{result.album}</p>
        <p>{result.id}</p>
      </div>
    </>
  );
}

//Prop validation

Track.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

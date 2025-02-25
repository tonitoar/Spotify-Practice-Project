import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function SearchBar({ dataBase, setSearchMusic }) {

  const [query, setQuery] = useState(""); //* stores user input
  const [errorMessage, setErrorMessage] = useState("") //* mensajes de error (NO ALERT!)

  function handleSubmit(e) {
    e.preventDefault(); //* prevents refresh page

    //* If the query is empty, show alert and return early
    if (query.trim() === "") {
      setSearchMusic([]); 
      setErrorMessage("EMPTY");
      return;
    }

    //*Filter DATABASE en función del QUERY(user input)
    const filteredMusic = dataBase.filter((song) => {
      return (
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
      );
    });

    //*Update the parent state with SETSEARCHMUSIC function from the parent
    setSearchMusic(filteredMusic);

    //*Music not found
    if (filteredMusic.length === 0) {
      setErrorMessage("NOT FOUND");
    }

    // console.log("filtered", filteredMusic);
  }

  useEffect(()=> {
    if(errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [errorMessage]); 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search Music"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      </form>
    </>
  );
}

SearchBar.propTypes = {
  dataBase: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      uri:PropTypes.string.isRequired,
    })
  ).isRequired,
  setSearchMusic: PropTypes.func.isRequired,
};

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState(""); //* Stores user input
  const [errorMessage, setErrorMessage] = useState(""); //* Error messages (NO ALERT!)

  function handleSubmit(e) {
    e.preventDefault(); //* Prevents page refresh

    if (query.trim() === "") {
      setErrorMessage("EMPTY"); //* Show "EMPTY" error
      return;
    }

    onSearch(query); //* Calls the function from App.jsx to fetch Spotify API results
  }

  useEffect(() => {
    if (errorMessage) {
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, //* Receives the search function from App.jsx
};

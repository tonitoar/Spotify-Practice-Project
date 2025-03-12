import { useState, useEffect } from "react";
import PropTypes from "prop-types";

//COMPONENTS
import Button from "../ui/Button";

//CSS
import styles from "../styles/SearchBar.module.css"; 

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          id="search"
          name="search"
          placeholder="Search Music"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
       <Button text="Search" onClick={handleSubmit} type="submit" />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, //* Receives the search function from App.jsx
};

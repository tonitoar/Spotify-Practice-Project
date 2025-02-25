// App.jsx
import { useState, useEffect } from "react";
import { searchSpotifyTracks } from "./utils/Spotify";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { getAccessTokenFromUrl, authorizeSpotify } from "./utils/Spotify";

export default function App() {
  const [searchMusic, setSearchMusic] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = getAccessTokenFromUrl();
    if (token) {
      console.log("Spotify token found:", token);
      setIsAuthenticated(true);
      setToken(token); // Store token in state
    }
  }, []);

  // Function to handle search
  const handleSearch = async (query) => {
    try {
      if (token) {
        const results = await searchSpotifyTracks(query, token);
        setSearchMusic(results); // Update state with search results
      } else {
        console.error("No token available for search.");
      }
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  return (
    <div>
      <h1>Spotify Search</h1>

      {/* Show login button if not authenticated */}
      {!isAuthenticated ? (
        <button onClick={authorizeSpotify}>Login to Spotify</button>
      ) : (
        <SearchBar onSearch={handleSearch} />
      )}

      {/* Show search results if there are any */}
      {searchMusic.length > 0 && (
        <SearchResults musicResults={searchMusic} token={token} />
      )}
    </div>
  );
}

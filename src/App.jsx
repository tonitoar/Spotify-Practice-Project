import { useState, useEffect } from "react";
import { 
  searchSpotifyTracks, 
  getAccessTokenFromUrl, 
  authorizeSpotify, 
  isAccessTokenExpired 
} from "./utils/Spotify";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

//CSS
import Button from "./ui/Button";
import styles from "./styles/App.module.css"; 


export default function App() {
  const [searchMusic, setSearchMusic] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // useEffect(() => {
  //   let accessToken = getAccessTokenFromUrl();
  
  //   if (!accessToken) {
  //     accessToken = localStorage.getItem("spotify_token");
  //   }
  
  //   if (accessToken && !isAccessTokenExpired(accessToken)) {
  //     console.log("Spotify token found:", accessToken);
  //     localStorage.setItem("spotify_token", accessToken);
  //     setIsAuthenticated(true);
  //     setToken(accessToken);
  //   } else {
  //     console.warn("Token expired or not found. Redirecting to login...");
  //     if (!localStorage.getItem("redirecting")) {
  //       localStorage.setItem("redirecting", "true");
  //       authorizeSpotify(); 
  //     }
  //   }
  // }, []);
  

  // Function to handle search
  const handleSearch = async (query) => {
    if (!token) {
      console.error("No token available for search.");
      return;
    }

    try {
      const results = await searchSpotifyTracks(query, token);
      setSearchMusic(results); // Update state with search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Spotify Search</h1>

      {/* Show login button if not authenticated */}
      {!isAuthenticated ? (
        <Button onClick={authorizeSpotify} text="Login to Spotify"/>
      ) : (
        <SearchBar onSearch={handleSearch} />
      )}

      {/* Show search results if there are any */}
      {searchMusic.length > 0 && <SearchResults musicResults={searchMusic} />}
    </div>
  );
}

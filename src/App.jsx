import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

import { useState } from "react";

export default function App() {
  const [dataBase] = useState([
    { 
      name: "Shape of You", 
      artist: "Ed Sheeran", 
      album: "Divide", 
      id: 1, 
      uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3" 
    },
    { 
      name: "Blinding Lights", 
      artist: "The Weeknd", 
      album: "After Hours", 
      id: 2, 
      uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b" 
    },
    { 
      name: "Someone Like You", 
      artist: "Adele", 
      album: "21", 
      id: 3, 
      uri: "spotify:track:4z7SA6l18u44JArfCwKuRJ" 
    }
  ]);
  

  const [searchMusic, setSearchMusic] = useState([]);


  return (
    <>
      <h1>Spotify</h1>
      <SearchBar dataBase={dataBase} setSearchMusic={setSearchMusic} />
      <SearchResults musicResults={searchMusic} />
    </>
  );
}

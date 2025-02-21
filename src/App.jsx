import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

import { useState } from "react";

export default function App() {
  const [dataBase] = useState([
    { name: "Shape of You", artist: "Ed Sheeran", album: "Divide", id: 1 },
    {
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      id: 2,
    },
    { name: "Someone Like You", artist: "Adele", album: "21", id: 3 },
  ]);

  const [searchMusic, setSearchMusic] = useState([]);


  return (
    <>
      <h1>Spotify</h1>
      <SearchBar dataBase={dataBase} setSearchMusic={setSearchMusic} />
      {/* SHOW THE COMPONET WHEN SEARCHMUSIC(DATA) EXIST */}
      {searchMusic.length > 0 && <SearchResults musicResults={searchMusic} />}
    </>
  );
}

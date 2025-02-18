export default function SearchBar() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search Music</label>
        <input type="text" id="search" name="search" />
        <button type="submit">Search</button>
      </form>
    </>
  );
}

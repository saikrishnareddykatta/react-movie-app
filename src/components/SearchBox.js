function SearchBox(props) {
  function changeHandler(value) {
    props.setSearchValue(value);
  }
  return (
    <div className="col col-sm-3">
      <input
        value={props.searchValue}
        type="text"
        className="form-control"
        placeholder="search for movie"
        onChange={(event) => changeHandler(event.target.value)}
      />
    </div>
  );
}

export default SearchBox;

// onChange={(event) => props.setSearchValue(event.target.value)}

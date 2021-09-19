function SearchBox(props) {
  function changeHandler(value) {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      props.setSearchValue(value);
    }, 400);
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

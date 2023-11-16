function SearchBox(props) {
  //   function changeHandler(value) {
  //     props.setSearchValue(value);
  //   }

  const debounce = (fn, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  //Using Callback
  //   const deb = useCallback(
  //     debounce((value) => props.setSearchValue(value), 1000),
  //     []
  //   );

  //   const betterFunction = (value) => {
  //     deb(value);
  //   };

  const betterFunction = debounce((value) => {
    props.setSearchValue(value);
  }, 1000);

  return (
    <div className="col col-sm-3">
      <input
        // value={props.searchValue}
        type="text"
        className="form-control"
        placeholder="search for movie"
        onChange={(event) => betterFunction(event.target.value)}
      />
    </div>
  );
}

export default SearchBox;

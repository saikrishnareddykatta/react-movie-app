import "./MovieList.css";
function MovieList(props) {
  const FavoriteComponent = props.favoriteComponent;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div
          key={index}
          className="image-container d-flex justify-content-start m-3"
        >
          <img src={movie.Poster} alt={movie.Title} />
          <div
            onClick={() => props.handleFavoritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  );
}

export default MovieList;

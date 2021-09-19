import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import axios from "axios";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovierequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=251d32ab`;
    const response = await axios.get(url);
    if (response.data.Search) {
      setMovies(response.data.Search);
    }
  };

  useEffect(() => {
    getMovierequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );
    if (movieFavorites) {
      setFavorites(movieFavorites);
    } else {
      setFavorites([]);
    }
  }, []);

  function saveToLocalStorage(items) {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  }

  function addFavoriteMovie(movie) {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  function removeFavoriteMovie(movie) {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
}

export default App;

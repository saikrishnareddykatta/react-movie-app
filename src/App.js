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
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=251d32ab`;
    const response = await axios.get(url);
    if (response.data.Search) {
      setMovies(response.data.Search);
    }
  };

  function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("react-movie-app-favorites"));
  }

  function saveToLocalStorage(items) {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  }

  function addFavoriteMovie(movie) {
    const movieList = getDataFromLocalStorage();
    if (!movieList) {
      const newFavouriteList = [...favorites, movie];
      setFavorites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
      return;
    }
    if (movieList.every((movieData) => movieData.imdbID !== movie.imdbID)) {
      const newFavouriteList = [...favorites, movie];
      setFavorites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
    return;
  }

  function removeFavoriteMovie(movie) {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  useEffect(() => {
    getMovierequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = getDataFromLocalStorage();
    if (movieFavorites) {
      setFavorites(movieFavorites);
    } else {
      setFavorites([]);
    }
  }, []);

  return (
    <div className="container-fluid movie-app">
      <h1 className="d-flex justify-content-center">Welcome to Movie Vault</h1>
      <div className="item d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="item">
        <MovieList
          movies={movies}
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}
        />
      </div>
      <div className="item d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="item">
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

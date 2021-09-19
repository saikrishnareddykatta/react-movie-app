import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import axios from "axios";
function App() {
  const [movies, setMovies] = useState([]);
  const getMovierequest = async () => {
    const url = "http://www.omdbapi.com/?s=star wars&apikey=251d32ab";
    const response = await axios.get(url);
    console.log(response);
    console.log(response.data.Search);
    setMovies(response.data.Search);
  };

  useEffect(() => {
    getMovierequest();
  }, []);

  return (
    <div className="container-fluid movie-app">
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;

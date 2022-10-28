import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  
  async function fetchMoviesHandler () {
    setIsLoding(true)
    const res = await fetch('https://swapi.py4e.com/api/films/')
    const data = await res.json();

      const transformedMovies = data.results.map(movieData =>{
        return {
          id : movieData.episode_id,
          title : movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate : movieData.release_date,
        }
      });
      setMovies(transformedMovies);
      setIsLoding(false);

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length===0 && <p>No Movies Found Click button to find some...</p>}
        {isLoding && <p>Loding...!</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

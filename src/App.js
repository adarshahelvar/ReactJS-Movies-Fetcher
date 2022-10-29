import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () =>{
    setIsLoding(true)
    setError(null);
    try {
    const res = await fetch('https://swapi.py4e.com/api/films/')
    const data = await res.json();

      if(!res.ok){
        throw new Error('Something went wrong');
      }

      const transformedMovies = data.results.map(movieData =>{
        return {
          id : movieData.episode_id,
          title : movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate : movieData.release_date,
        }
      });
      setMovies(transformedMovies);
    }catch(error){
      setError(error.message);
    }
    setIsLoding(false);
  },[]);

  useEffect(()=>{               // useEffect always take two parametre and second parameter is awlays an array
    fetchMoviesHandler ();
  },[fetchMoviesHandler]);

  let content = <p>No Movies Found Click button to find some...</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }
  if(error){
    content = <p>{error}</p>
  }
  if(isLoding){
    content = <p>Loding...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

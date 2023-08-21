import { useState } from "react";
import { Movie } from "../../types/movie";
import SingleMovieCard from "../single-movie-card/single-movie-card";

type MovieListProps = {
  movies: Movie[],
}

function MovieList({movies}: MovieListProps): JSX.Element {

  const [currentMovie, setCurrentMovie] = useState(0);


  return(
    <>
      {movies.map((movie)=>
          <article className="small-film-card catalog__films-card" key={movie.scoresCount + movie.id} onMouseEnter={() => {setCurrentMovie(movie.id)}}>
            <SingleMovieCard movie={movie}/>
          </article>
        )}
        <p>Current selected movie id: {currentMovie}</p>
</>
  )
}

export default MovieList;

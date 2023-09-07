import { Movie } from "../../types/movie";
import SingleMovieCard from "../single-movie-card/single-movie-card";

type MovieListProps = {
  movies: Movie[],
}

function MovieList({movies}: MovieListProps): JSX.Element {

  return(
    movies.length<1
    ?
    <h2> No movies yet! </h2>
    :
    <>
      {movies.map((movie)=>
          <article className="small-film-card catalog__films-card" key={movie.scoresCount + movie.id} >
            <SingleMovieCard autoPlay={false} movie={movie}/>
          </article>
        )}
</>
  )
}

export default MovieList;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GenresStart } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateGenre } from "../../store/slices/action-data/action-data";
import { Movie } from "../../types/movie";
import MovieList from "../movie-list/movie-list";

const FILMS_PER_STEP = 8;

type CatalogGenreListProps = {
  movies: Movie[]
}

function CatalogGenreList ({movies}: CatalogGenreListProps):JSX.Element  {

  const dispatch = useAppDispatch();

  const [genres, setGenres] = useState<string[]>([]);
  const [step, setStep] = useState(FILMS_PER_STEP);

  const currentGenre = useAppSelector(({ACTION}) => ACTION.genre);
  const moviesOfGenre = movies.filter(({ genre }) => currentGenre === GenresStart || currentGenre === genre)

  const handleShowMoreMovies = () => {
    setStep(step + FILMS_PER_STEP)
  };

  useEffect(() => {
    setGenres([GenresStart, ...new Set(movies.map(({ genre }) => genre))]);
  }, [movies]);


  return (
    <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <ul className="catalog__genres-list">
      {genres.slice(0,10).map((item)=>
      <li key={item} className={`catalog__genres-item ${currentGenre === item ? 'catalog__genres-item--active' : ''} `} onClick={()=> dispatch(updateGenre(item))}>
        <Link to='' className="catalog__genres-link">{item}</Link>
      </li>
      )}
    </ul>

    <div className="catalog__films-list">

    <MovieList movies={moviesOfGenre.slice(0, step)} />

    </div>

{ moviesOfGenre.length > step  &&
    <div className="catalog__more">
      <button onClick={handleShowMoreMovies} className="catalog__button" type="button">Show more</button>
    </div>
}

  </section>
  )
}

export default CatalogGenreList;

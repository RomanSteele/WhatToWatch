import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateGenre } from "../../store/action";
import { Movie } from "../../types/movie";
import MovieList from "../movie-list/movie-list";

const FILMS_PER_STEP=8
let moviesToRender: Movie[] = [];

type CatalogGenreListProps = {
  movies: Movie[]
}

function CatalogGenreList ({movies}: CatalogGenreListProps):JSX.Element  {

  const dispatch = useAppDispatch();

  const [genres, setGenres] = useState<string[]>([]);
  const currentGenre = useAppSelector((state) => state.genre);

  const filmsOfGenre = movies.filter(({ genre }) => currentGenre === 'All genres' || currentGenre === genre)

  const [step, setStep] = useState(FILMS_PER_STEP);
  const [renderedMovies, setRenderedMovies] = useState<Movie[]>([])

  const loopWithSlice = (start: number, end: number) => {
    const slicedFilms = filmsOfGenre.slice(start, end);
    moviesToRender = [...moviesToRender, ...slicedFilms];
    setRenderedMovies(moviesToRender);
  };

  const handleShowMoreMovies = () => {
    loopWithSlice(step, step + FILMS_PER_STEP);
    setStep(step + FILMS_PER_STEP)
  };

  const changeGenre = () => {
    moviesToRender = [];
    setStep(FILMS_PER_STEP);
  };


  useEffect(()=>{
    changeGenre()
  }, [currentGenre]);

  useEffect(() => {
    loopWithSlice(0, FILMS_PER_STEP);
  }, [currentGenre]);

  useEffect(() => {
    setGenres(['All genres', ...new Set(movies.map(({ genre }) => genre))]);
  }, [movies]);


  return (
    <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <ul className="catalog__genres-list">
      {genres.map((item)=>
      <li key={item} className={`catalog__genres-item ${currentGenre === item ? 'catalog__genres-item--active' : ''} `} onClick={()=> dispatch(updateGenre(item))}>
        <Link to='' className="catalog__genres-link">{item}</Link>
      </li>
      )}
    </ul>

    <div className="catalog__films-list">

    <MovieList movies={renderedMovies} />

    </div>

{ filmsOfGenre.length > FILMS_PER_STEP && renderedMovies.length != filmsOfGenre.length &&
    <div className="catalog__more">
      <button onClick={handleShowMoreMovies} className="catalog__button" type="button">Show more</button>
    </div>
}

  </section>
  )
}

export default CatalogGenreList;

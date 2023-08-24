import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateGenre } from "../../store/action";
import { Movie } from "../../types/movie";
import MovieList from "../movie-list/movie-list";

type CatalogGenreListProps = {
  movies: Movie[]
}

function CatalogGenreList ({movies}: CatalogGenreListProps):JSX.Element  {

  const dispatch = useAppDispatch();

  const [genres, setGenres] = useState<string[]>([]);
  const currentGenre = useAppSelector((state) => state.genre);

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

    <MovieList movies={movies.filter(({ genre }) => currentGenre === 'All genres' || currentGenre === genre)} />

    </div>

    <div className="catalog__more">
      <button className="catalog__button" type="button">Show more</button>
    </div>
  </section>
  )
}

export default CatalogGenreList;

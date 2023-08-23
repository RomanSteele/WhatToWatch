import { Helmet } from "react-helmet-async";
import {Link, useParams, useNavigate} from 'react-router-dom';
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";
import MovieList from "../../components/movie-list/movie-list";
import MoviePageTabs from "../../components/movie-page-tabs/movie-page-tabs";
import UserBlock from "../../components/user-block/user-block";
import { AppRoute } from "../../const";
import { Movie } from "../../types/movie";


type MainPageProps = {
  movies: Movie[]
}


function MoviePage({movies}: MainPageProps): JSX.Element {

  const params = useParams();

  const navigate = useNavigate();

  const selectedMovie = (movies.filter((movie) => movie.id.toString() === params.id))[0];

  const {id, name, posterImage, genre, released } = selectedMovie;


return <>
<section className="film-card film-card--full">

  <Helmet>
    <title>WTW: {name}</title>
  </Helmet>

      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">

          <Logo/>

          <UserBlock/>

        </header>

        <div className="film-card__wrap">
          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <div className="film-card__buttons">
              <button onClick={() => {
                  navigate(`${AppRoute.Player}/${id}`);
                }} className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <Link to={AppRoute.AddReview} className="btn film-card__button">Add review</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>

          <MoviePageTabs movie={selectedMovie} />

        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__films-list">
          <MovieList movies={movies}/>
        </div>
      </section>

      <Footer/>
    </div>
  </>
    }

    export default MoviePage;

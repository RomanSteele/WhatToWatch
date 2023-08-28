import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {Link, useParams, useNavigate} from 'react-router-dom';
import AddToMyListButton from "../../components/add-to-my-list-button/add-to-my-list-button";
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";
import MovieList from "../../components/movie-list/movie-list";
import MoviePageTabs from "../../components/movie-page-tabs/movie-page-tabs";
import UserBlock from "../../components/user-block/user-block";
import { AppRoute, AuthorizationStatus } from "../../const";
import { useAppSelector } from "../../hooks";
import { store } from "../../store";
import { fetchCurrentMovieAction, fetchReviewsAction, fetchSimilarMoviesAction } from "../../store/api-actions";





function MoviePage(): JSX.Element {



  const navigate = useNavigate();
  const params = useParams();
  const movieId = Number(params.id);

  const selectedMovie = useAppSelector(({DATA})=> DATA.currentMovie)
  const { reviews, similarMovies } = useAppSelector(({ DATA })=> DATA);
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);


  const similarMoviesToRender = similarMovies.slice(0,4);


  const { id, name, posterImage, genre, released, backgroundImage } = selectedMovie;

  useEffect(() => {
    if (!selectedMovie) {
      navigate(AppRoute.NotFound);
      return;
    }
    window.scrollTo(0, 0);
  }, [movieId, navigate]);



  useEffect (() => {
    if (params.id) {
      store.dispatch(fetchCurrentMovieAction(movieId));
      store.dispatch(fetchReviewsAction(movieId));
      store.dispatch(fetchSimilarMoviesAction(movieId));
    }
  }, [params.id]);




return <>
<section className="film-card film-card--full">

  <Helmet>
    <title>WTW: {name}</title>
  </Helmet>

      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
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
              <AddToMyListButton filmId={id}/>
              {authorizationStatus === AuthorizationStatus.Auth ? <Link className="btn film-card__button"to={`/movie/${id}/review`}>Add review</Link>: ''}
            </div>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={posterImage} alt={name} width="218" height="327" />
          </div>

          <MoviePageTabs movie={selectedMovie} reviews={reviews} />

        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__films-list">
          <MovieList movies={similarMoviesToRender}/>
        </div>
      </section>

      <Footer/>
    </div>
  </>
    }

    export default MoviePage;

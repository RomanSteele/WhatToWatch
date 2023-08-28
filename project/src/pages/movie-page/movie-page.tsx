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
import { fetchReviewsAction } from "../../store/api-actions";





function MoviePage(): JSX.Element {

  const { reviews, movies } = useAppSelector(({ DATA })=> DATA);
  const {authorizationStatus } = useAppSelector(({USER})=> USER)

  const params = useParams();
  const navigate = useNavigate();

  const selectedMovie = (movies.filter((movie) => movie.id.toString() === params.id))[0];

  const {id, name, posterImage, genre, released } = selectedMovie;

  console.log(reviews)

  useEffect(() => {
    if (!selectedMovie) {
      navigate(AppRoute.NotFound);
      return;
    }
    console.log('dispatch')
    store.dispatch(fetchReviewsAction(id));
  }, [selectedMovie, navigate]);


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
          <MovieList movies={movies}/>
        </div>
      </section>

      <Footer/>
    </div>
  </>
    }

    export default MoviePage;

import CatalogGenreList from "../../components/catalog-genre-list/catalog-genre-list";
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";
import Userblock from "../../components/user-block/user-block";
import { Movie } from "../../types/movie";

type MainPageProps = {
  movies: Movie[]
}


function MainPage({movies}: MainPageProps): JSX.Element {


  return <>
  <section className="film-card">
    <div className="film-card__bg">
      <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <header className="page-header film-card__head">

      <Logo/>

      <Userblock/>

    </header>

    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">The Grand Budapest Hotel</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">Drama</span>
            <span className="film-card__year">2014</span>
          </p>

          <div className="film-card__buttons">
            <button className="btn btn--play film-card__button" type="button">
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
          </div>
        </div>
      </div>
    </div>
  </section><div className="page-content">

    <CatalogGenreList movies={movies}/>

     <Footer/>

    </div>
    </>
    }

    export default MainPage;

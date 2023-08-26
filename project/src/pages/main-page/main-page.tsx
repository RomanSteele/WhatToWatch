import CatalogGenreList from "../../components/catalog-genre-list/catalog-genre-list";
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";
import PromoMovie from "../../components/promo-movie/promo-movie";
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
      <PromoMovie/>
    </div>
  </section><div className="page-content">

    <CatalogGenreList movies={movies}/>

     <Footer/>

    </div>
    </>
    }

    export default MainPage;

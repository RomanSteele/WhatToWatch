import { Helmet } from "react-helmet-async";
import Footer from "../../components/footer/footer";
import Logo from "../../components/logo/logo";
import MovieList from "../../components/movie-list/movie-list";
import UserBlock from "../../components/user-block/user-block";
import { useAppSelector } from "../../hooks";



function MyListPage(): JSX.Element {

  const movies = useAppSelector(({DATA}) => DATA.favoriteMovies)


  return <>

  <Helmet>
    <title>WTW: My List</title>
  </Helmet>


  <div className="user-page">
      <header className="page-header user-page__head">

        <Logo/>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock/>

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {movies.length > 0 ?
            <MovieList movies={movies}/>
              :
              <>
            <h1 className="page-title ">Nothing here yet! </h1>
            </>}
        </div>
      </section>

      <Footer/>

    </div>
</>
    }

    export default MyListPage;

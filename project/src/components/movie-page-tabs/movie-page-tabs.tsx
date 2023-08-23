import { useState } from "react";
import { Link } from "react-router-dom";
import { TabKeys } from "../../const"
import { Movie } from "../../types/movie";
import { Reviews } from "../../mocks/reviews";
import MoviePageDetails from "./movie-page-details";
import MoviePageOverview from "./movie-page-overview";
import MoviePageReviews from "./movie-page-reviews";

type MoviePageTabsProps = {
  movie: Movie,
};

function MoviePageTabs ({movie}: MoviePageTabsProps): JSX.Element {

  const [isActive,setIsActive] = useState<number>(1);


  const handleTabClick = (id: number)=> {
    setIsActive(id)
  }

  return(
  <div className="film-card__desc">
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {
          TabKeys.map((tab)=>
          <li key = {tab.title} className={`film-nav__item ${tab.id === isActive ? 'film-nav__item--active' : ''}`} onClick={ () => handleTabClick(tab.id)}>
          <Link to={''} className="film-nav__link">{tab.title}</Link>
        </li>
        )
        }
      </ul>
    </nav>

{isActive === TabKeys[0].id && <MoviePageOverview movie={movie}/>}
{isActive === TabKeys[1].id && <MoviePageDetails movie={movie}/>}
{isActive === TabKeys[2].id && <MoviePageReviews reviews={Reviews}/>}


  </div>
  )

}

export default MoviePageTabs

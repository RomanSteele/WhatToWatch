import { useState } from "react";
import { Link } from "react-router-dom";
import MoviePageDetails from "./movie-page-details";
import MoviePageOverview from "./movie-page-overview";
import MoviePageReviews from "./movie-page-reviews";
import { Review } from "../../types/review";
import { Movie } from "../../types/movie";
import { TabKeys } from "../../const"

type MoviePageTabsProps = {
  movie: Movie,
  reviews:Review[],
};

function MoviePageTabs ({ movie, reviews }: MoviePageTabsProps): JSX.Element {

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
          <li key = {tab.title} className={`film-nav__item ${tab.id === isActive ? 'film-nav__item--active' : ''}`} onClick={ () => handleTabClick(tab.id)} data-testid={`${tab.title}-test`}>
          <Link to={''} className="film-nav__link">{tab.title}</Link>
        </li>
        )
        }
      </ul>
    </nav>

{isActive === TabKeys[0].id && <MoviePageOverview movie={movie}/>}
{isActive === TabKeys[1].id && <MoviePageDetails movie={movie}/>}
{isActive === TabKeys[2].id && <MoviePageReviews reviews={reviews}/>}


  </div>
  )

}

export default MoviePageTabs;

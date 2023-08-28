import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppSelector } from "../../hooks";
import AddToMyListButton from "../add-to-my-list-button/add-to-my-list-button";


function PromoMovie ():JSX.Element {

  const promoMovie = useAppSelector(({DATA})=>DATA.promoMovie)

  const navigate = useNavigate();

  const {name, id, posterImage, genre, released,} = promoMovie;

  return(
  <div className="film-card__info">
        <div className="film-card__poster">
          <img src={posterImage} alt={name} width="218" height="327" />
      </div>
  <div className="film-card__desc">
    <h2 className="film-card__title">{name}</h2>
    <p className="film-card__meta">
      <span className="film-card__genre">{genre}</span>
      <span className="film-card__year">{released}</span>
    </p>

  <div className="film-card__buttons">
    <button onClick={() => {navigate(`${AppRoute.Player}/${id}`);
                }}className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
    <AddToMyListButton filmId={id}/>
    </div>
   </div>
   </div>
  )
}

export default PromoMovie;

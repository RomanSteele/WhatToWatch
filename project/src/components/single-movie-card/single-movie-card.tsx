import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { Movie } from "../../types/movie";

type SingleMovieCardProps ={
  movie: Movie,
}
function SingleMovieCard({movie}: SingleMovieCardProps): JSX.Element {

  const { id, name, previewImage } = movie;

  return(
    <>
    <div className="small-film-card__image">
      <img src={previewImage} alt={name} width="280" height="175" />
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={AppRoute.Movie + `/${id}`}>{name}</Link>
    </h3>
    </>
  )
}

export default SingleMovieCard;

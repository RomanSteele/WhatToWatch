import { formatTime } from "../../helpers";
import { Movie } from "../../types/movie";

type MoviePageDetailsProps ={
  movie: Movie
}

function MoviePageDetails ({movie}: MoviePageDetailsProps): JSX.Element {

  const {director, starring, runTime, genre, released} = movie;
  const formatCurrentTime = formatTime(runTime);


  return(
    <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span className="film-card__details-value">

        {starring.map((item, index) => (
        <span key={item}>{item}{index !== starring.length - 1 && ','} <br/></span>
      ))}

        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{formatCurrentTime}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{released}</span>
      </p>
    </div>
  </div>
  )

}

export default MoviePageDetails

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppRoute, VIDEO_PREVIEW_DELAY } from "../../const";
import { Movie } from "../../types/movie";

type SingleMovieCardProps ={
  movie: Movie,
  autoPlay: boolean,
}
function SingleMovieCard({movie, autoPlay}: SingleMovieCardProps): JSX.Element {

  const { id, name, previewImage, previewVideoLink } = movie;

  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);


  const handleOnMouseEnter = () => {
    setTimer(setTimeout(() => {
      if (!isLoading) {
        videoRef.current && videoRef.current.play();
      }
    }, VIDEO_PREVIEW_DELAY));
  };

  const handleOnMouseLeave = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
      videoRef.current && videoRef.current.load();

    }
  };

  return(
    <>
    <div className="small-film-card__image" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
    <video muted ref={videoRef} src={previewVideoLink} poster={previewImage} width="100%" height="100%" autoPlay={autoPlay} onLoadedData={() => {setIsLoading(false);}}></video>
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={AppRoute.Movie + `/${id}`}>{name}</Link>
    </h3>
    </>
  )
}

export default SingleMovieCard;

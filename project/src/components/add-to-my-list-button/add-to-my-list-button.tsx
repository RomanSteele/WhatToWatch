import { store } from '../../store';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMyListMovie } from "../../store/api-actions";
import { useAppSelector } from "../../hooks";
import { Movie } from "../../types/movie";
import { AppRoute, AuthorizationStatus } from "../../const";

type AddToMyListButtonProps = {
  movieId: number,
  };

function AddToMyListButton ({ movieId }: AddToMyListButtonProps): JSX.Element {

  const { favoriteMovies } = useAppSelector(({ DATA }) => DATA);
  const { authorizationStatus } = useAppSelector(({ USER }) => USER);
  const [movieStatus, setMovieStatus] = useState(0);

  const navigate = useNavigate();

  const newMovieStatus = 1 - movieStatus;

  const addToMyList = (id: number, status: number) => {
    store.dispatch(addMyListMovie({ id, status }));
  };

  useEffect(()=>{
    if (!favoriteMovies) {
      return;
    }
    if (favoriteMovies.find((item: Movie) => item.id === movieId)) {
      setMovieStatus(1);
    } else {
      setMovieStatus(0);
    }
  },[movieId, favoriteMovies])

  return(
    <button onClick={()=> authorizationStatus === AuthorizationStatus.Auth ? addToMyList(movieId, newMovieStatus) : navigate(AppRoute.Login)}className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
      {authorizationStatus === AuthorizationStatus.Auth && movieStatus ? <use xlinkHref="#in-list" data-testid="in-list"></use> : <use xlinkHref="#add" data-testid="not-in-list"></use>}
      </svg>
        <span>My list</span>
    </button>
  )
}

export default AddToMyListButton;

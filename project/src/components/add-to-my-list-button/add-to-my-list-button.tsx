import { addMyListMovie } from "../../store/api-actions";
import { store } from '../../store';
import { useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { Movie } from "../../types/movie";
import { AppRoute, AuthorizationStatus } from "../../const";
import { useNavigate } from "react-router-dom";

type AddToMyListButtonProps = {
filmId: number,
}

function AddToMyListButton ({ filmId }: AddToMyListButtonProps): JSX.Element {

  const myListMovies = useAppSelector(({ DATA }) => DATA.favoriteMovies);
  const authorizationStatus = useAppSelector(({ USER }) => USER.authorizationStatus);
  const [movieStatus, setMovieStatus] = useState(0);

  const navigate = useNavigate();

  const newMovieStatus = 1 - movieStatus;

  const addToMyList = (id: number, status: number) => {
    store.dispatch(addMyListMovie({ id, status }));
  };

  useEffect(()=>{
    if (!myListMovies) {
      return;
    }
    if (myListMovies.find((item: Movie) => item.id === filmId)) {
      setMovieStatus(1);
    } else {
      setMovieStatus(0);
    }
  },[filmId, myListMovies])

  return(
    <button onClick={()=> authorizationStatus === AuthorizationStatus.Auth ? addToMyList(filmId, newMovieStatus) : navigate(AppRoute.Login)}className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width="19" height="20">
      {authorizationStatus === AuthorizationStatus.Auth && movieStatus ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
        <span>My list</span>
    </button>
  )
}

export default AddToMyListButton;

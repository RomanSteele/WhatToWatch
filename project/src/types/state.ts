import {store} from '../store/index';
import { Movie } from './movie';
import { Review } from './review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type Data = {
  movies: Movie[],
  favoriteMovies: Movie[],
  similarMovies: Movie[],
  currentMovie: Movie,
  reviews: Review[],
  error: string | null,
  promoMovie:Movie
};

export type UserData = {
  authorizationStatus: string,
};

export type ActionData = {
  genre: string,
  isLoading: boolean,
};

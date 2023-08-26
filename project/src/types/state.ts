import {store} from '../store/index.js';
import { Movie } from './movie.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type Data = {
  movies: Movie[],
  favoriteMovies: Movie[],
  error: string | null,
  promoMovie:Movie
};

export type UserData = {
  authorizationStatus: string,
};

export type ActionData = {
  genre: string,
};

import {store} from '../store/index.js';
import { Movie } from './movie.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ReducerType = {
  genre: string,
  movies: Movie[],
  authorizationStatus: string,
  error: string | null;
}

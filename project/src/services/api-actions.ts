import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {loadMovies} from '../store/action';
import {APIRoute, APIType} from '../const';
import { Movie } from '../types/movie.js';

export const fetchMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;

}>(
  APIType.DataFetchMovies,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    dispatch(loadMovies(data));
  },
);



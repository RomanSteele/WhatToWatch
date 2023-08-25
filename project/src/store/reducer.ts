import {createReducer} from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ReducerType } from '../types/state';
import { loadMovies, requireAuthorization, setError, updateGenre } from './action';

const startGenre = 'All genres';

const initialState: ReducerType = {
  genre: startGenre,
  movies: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadMovies, (state, action) => {
      state.movies = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });

});

export { reducer };

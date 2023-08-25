import {createReducer} from '@reduxjs/toolkit';
import { ReducerType } from '../types/state';
import { loadMovies, updateGenre } from './action';

const startGenre = 'All genres';

const initialState: ReducerType = {
  genre: startGenre,
  movies: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadMovies, (state, action) => {
      state.movies = action.payload;
    });

});

export { reducer };

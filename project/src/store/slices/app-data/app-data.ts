import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../../../types/state';
import { NameSpace } from '../../../const';


const initialState: Data = {
  movies: [],
  error: null,
};

export const data = createSlice ({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadMovies: (state, action) => {
      state.movies = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

  },
});

export const { loadMovies, setError } = data.actions;

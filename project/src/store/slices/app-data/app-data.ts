import { createSlice } from '@reduxjs/toolkit';
import { Data } from '../../../types/state';
import { NameSpace } from '../../../const';


const initialState: Data = {
  movies: [],
  favoriteMovies: [],
  promoMovie: {
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [''],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
  error: null,
};

export const data = createSlice ({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadMovies: (state, action) => {
      state.movies = action.payload;
    },
    loadFavoriteMovies: (state, action) => {
      state.favoriteMovies = action.payload;
    },
    loadPromoMovie: (state, action) => {
      state.promoMovie = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

  },
});

export const { loadMovies, setError, loadFavoriteMovies, loadPromoMovie } = data.actions;

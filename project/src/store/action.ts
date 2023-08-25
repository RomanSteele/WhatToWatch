import { createAction } from '@reduxjs/toolkit';
import { APIType } from '../const';
import { Movie } from '../types/movie';

export const updateGenre = createAction<string>('main/updateGenre')

export const loadMovies = createAction<Movie[]>(APIType.DataFetchMovies)

import { createAction } from '@reduxjs/toolkit';
import { APIType, AuthorizationStatus } from '../const';
import { Movie } from '../types/movie';

export const updateGenre = createAction<string>('main/updateGenre')

export const loadMovies = createAction<Movie[]>(APIType.DataFetchMovies)

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('main/setError');

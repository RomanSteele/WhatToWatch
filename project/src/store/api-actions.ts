import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {redirectToRoute} from './action';
import {APIRoute, APIType, AppRoute, AuthorizationStatus, ERROR_TIMEOUT} from '../const';
import {saveToken, dropToken} from '../services/token';
import { Movie } from '../types/movie.js';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import {store} from './';

import { requireAuthorization } from './slices/user-data/used-data';
import { loadFavoriteMovies, loadMovies , loadPromoMovie, setError } from './slices/app-data/app-data';
import { PushMovieToMyList } from '../types/my-list-movie.js';


export const clearErrorAction = createAsyncThunk(
  APIType.ActionClearError,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      ERROR_TIMEOUT,
    );
  },
);

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

export const fetchFavoriteMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;

}>(
  APIType.DataFetchFavoriteMovies,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Movie[]>(APIRoute.FavotireMovies);
    dispatch(loadFavoriteMovies(data));
  },
);

export const fetchPromoMovieAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;

}>(
  APIType.fataFetchPromoMovie,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Movie>(APIRoute.PromoMovie);
    dispatch(loadPromoMovie(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIType.UserCheckAuth,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIType.UserLogin,
  async ({ email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.MyList))
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  APIType.UserLogout,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const addMyListMovie = createAsyncThunk<void, PushMovieToMyList, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  APIType.AddMyListMovie,
  async ({ id, status }, { dispatch, extra: api }) => {
      await api.post(`${APIRoute.FavotireMovies}/${id}/${status}`, { id, status });
      dispatch(fetchFavoriteMoviesAction());
    },
);


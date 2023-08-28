import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {redirectToRoute} from './action';
import {APIRoute, APIType, AppRoute, AuthorizationStatus, ERROR_TIMEOUT} from '../const';
import {saveToken, dropToken} from '../services/token';
import { Movie } from '../types/movie';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import {store} from './';

import { requireAuthorization } from './slices/user-data/used-data';
import { loadFavoriteMovies, loadMovies , loadPromoMovie, loadReviews, setError } from './slices/app-data/app-data';
import { PushMovieToMyList } from '../types/my-list-movie';
import { addReview } from '../types/add-review';
import { Review } from '../types/review';


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
  APIType.DataFetchPromoMovie,
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

export const fetchReviewsAction = createAsyncThunk<void, number | null, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;

}>(
  APIType.DataFetchReviews,
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(`${APIRoute.Reviews}/${id}`);
    console.log(data)
    dispatch(loadReviews(data));
  },
);

export const addMovieReview = createAsyncThunk<void, addReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  APIType.AddMyListMovie,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
      await api.post(`${APIRoute.Reviews}/${id}`, { comment, rating });
      dispatch(fetchFavoriteMoviesAction());
    },
);



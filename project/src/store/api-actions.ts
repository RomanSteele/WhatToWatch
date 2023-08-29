import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {redirectToRoute} from './action';
import {APIRoute, APIType, AppRoute, AuthorizationStatus, ERROR_TIMEOUT} from '../const';
import {saveToken, dropToken} from '../services/token';
import { Movie } from '../types/movie';
import { AuthData } from '../types/auth-data';
import { UserData, UserLoginData } from '../types/user-data';
import {store} from './';

import { loadUserData, requireAuthorization } from './slices/user-data/used-data';
import { loadCurrentMovie, loadFavoriteMovies, loadMovies , loadPromoMovie, loadReviews, loadSimilarMovies, setError } from './slices/app-data/app-data';
import { PushMovieToMyList } from '../types/my-list-movie';
import { addReview } from '../types/add-review';
import { Review } from '../types/review';
import { changeLoadingStatus } from './slices/action-data/action-data';


export const fetchMoviesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;

}>(
  APIType.DataFetchMovies,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(changeLoadingStatus(true));
    const {data} = await api.get<Movie[]>(APIRoute.Movies);
    dispatch(loadMovies(data));
    dispatch(changeLoadingStatus(false));
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

export const fetchSimilarMoviesAction = createAsyncThunk<void, number | null, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;

}>(
  APIType.DataFetchSimilarMovies,
  async (id, {dispatch, extra: api}) => {
    const {data} = await api.get<Movie[]>(`${APIRoute.Movies}/${id}/similar`);
    dispatch(loadSimilarMovies(data));
  },
);

export const fetchCurrentMovieAction = createAsyncThunk<void, number | null, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;

}>(
  APIType.DataFetchCurrentMovie,
  async (id, {dispatch, extra: api}) => {
    dispatch(changeLoadingStatus(true));
    const {data} = await api.get<Movie>(`${APIRoute.Movies}/${id}`);
    dispatch(loadCurrentMovie(data));
    dispatch(changeLoadingStatus(false));
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
      console
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const fetchUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  APIType.UserData,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserLoginData>(APIRoute.Login);
      dispatch(loadUserData(data));
      dispatch(fetchFavoriteMoviesAction());
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
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
    dispatch(changeLoadingStatus(false));
      await api.post(`${APIRoute.Reviews}/${id}`, { comment, rating });
      dispatch(changeLoadingStatus(true));
      dispatch(fetchFavoriteMoviesAction());
    },
);

export const clearErrorAction = createAsyncThunk(
  APIType.ActionClearError,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      ERROR_TIMEOUT,
    );
  },
);

import { Stars } from "./types/rating-stars";
import { MovieTab } from "./types/tabs";

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Player = '/player',
  PlayerById = '/player/:id',
  MyList = '/favorites',
  AddToMyList = '/favorites/:id/:status',
  AddReview = '/movie/:id/review',
  Movie = '/movie',
  SelectedMovie = '/movie/:id',
  NotFound='*',
}

export enum APIRoute {
  Movies = '/films',
  Login = '/login',
  Logout = '/logout',
  FavotireMovies = '/favorite',
  PromoMovie = '/promo',
  Reviews = '/comments',
}

export enum APIType {
  DataFetchMovies = 'data/fetchMovies',
  DataFetchFavoriteMovies = 'data/fetchFavoriteMovies',
  DataFetchPromoMovie = 'data/fetchPromoMovie',
  DataFetchSimilarMovies = 'data/fetchSimilarMovies',
  DataFetchCurrentMovie = 'data/fetchCurrentMovie',
  DataFetchReviews = 'data/fetchReviews',
  AddMyListMovie = 'action/addMyListFilm',
  UserCheckAuth = 'user/checkAuth',
  UserData = 'user/data',
  UserLogin = 'user/login',
  UserLogout = 'user/logout',
  ActionClearError = 'action/clearError'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const STARS: Stars[] = [
  { 'id': 10 },
  { 'id': 9 },
  { 'id': 8 },
  { 'id': 7 },
  { 'id': 6 },
  { 'id': 5 },
  { 'id': 4 },
  { 'id': 3 },
  { 'id': 2 },
  { 'id': 1 },
];

export enum PlayerActiveStatus {
  RefPlay = '#play-s',
  RefPause = '#pause',
  Play = 'Play',
  Pause = 'Pause'
}

export enum TimeConvertion {
  SecondsInMinute = 60,
  MilisecondsInSecond = 1000,
  SetPercent = 100,
  NumberAfterParse = 3,
  Limit = 4,
}

export const TabKeys: MovieTab[] = [
  {
    id: 1,
    title: 'Overview',
  },
  {
    id: 2,
    title: 'Details',
  },
  {
    id: 3,
    title: 'Reviews',
  },
];

export const GenresStart = 'All genres';


export enum NameSpace {
  User = 'USER',
  Data = 'DATA',
  Action = 'ACTION',
}

export const ERROR_TIMEOUT = 3000;

export const VIDEO_PREVIEW_DELAY = 1000;

export const FILMS_PER_STEP = 8;

export enum CommentLength {
  Min = 5,
  Max = 400,
}

export enum StarsStart {
  start = 0,
}


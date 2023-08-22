import { Stars } from "./types/rating-stars";

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Player = '/player',
  PlayerById = '/player/:id',
  MyList = '/favorites',
  AddReview = '/add-review',
  Movie = '/movie',
  SelectedMovie = '/movie/:id',
  NotFound='*',
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

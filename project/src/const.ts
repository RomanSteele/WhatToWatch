import { Stars } from "./types/rating-stars";
import { MovieTab } from "./types/tabs";

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

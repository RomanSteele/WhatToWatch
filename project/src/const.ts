export enum AppRoute {
  Main = '/',
  Login = '/login',
  Player = '/player',
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

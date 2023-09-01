import { system, name, internet , datatype, date } from 'faker';
import { AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { Movie } from '../types/movie';
import { Review } from '../types/review';
import { UserLoginData } from '../types/user-data';


export const fakeRating: Array<number> = [2, 4, 7, 9, 10, -1, 11];

export const fakeEmail: Array<string> = ['ousekf@kjsenf.com', 'wefwfwe@fsefsd.c'];

export const fakePassword: Array<string> = ['ousekf2346477658', ''];

export const fakeAuthStatus: Array<string> = [AuthorizationStatus.Unknown, AuthorizationStatus.Auth, AuthorizationStatus.NoAuth];

export const fakeGenre = 'Drama';

export const fakeError = ['Error!', null ];

export const fakeToken = 'se123orjklsfnwgv45h'

export const fakeDeleteFromFavoritesMovie:({id: number, status: number}) = {id: 1, status: 0}

export const fakeId: number =  datatype.number({ min: 1 });

export const fakeUserReview = { id: datatype.number({ min: 1 }), comment: datatype.string(20) , rating: datatype.number({ min: 1 }) };


export const fakeUserData: UserLoginData = {
  avatarUrl: internet.avatar(),
  email: datatype.string(12),
  id: 0,
  name: name.title(),
  token: datatype.string(20),
};

export const fakeMovie:Movie =({
  name: name.title(),
  posterImage: system.filePath(),
  previewImage: internet.avatar(),
  backgroundImage: system.filePath(),
  backgroundColor: datatype.string(8),
  description: datatype.string(110),
  rating: datatype.float({ min: 0, max: 10 }),
  scoresCount: datatype.number({ min: 0, max: 10 }),
  director: name.title(),
  starring: [
    name.title(),
    name.title(),
    name.title(),
  ],
  runTime: 150,
  genre: datatype.string(10),
  released: datatype.number({ min: 1900, max: 2023 }),
  id: datatype.number({ min: 1 }),
  isFavorite: datatype.boolean(),
  videoLink: system.filePath(),
  previewVideoLink: system.filePath(),
});

const moviesArrayTemplate = [0, 1, 2, 3, 4, 5, 6, 7];
export const fakeMoviesArray = moviesArrayTemplate.map(()=> fakeMovie)

export const fakeReview: Review ={
  comment: datatype.string(60),
  date: "2023-07-24T07:05:34.295Z",
  id:  datatype.number({ min: 0, max: 10 }),
  rating:  datatype.number({ min: 0, max: 10 }),
  user: {
  id:  datatype.number({ min: 0, max: 10 }),
  name: datatype.string(60),
  }};

  const reviewsArrayTemplate = [0, 1, 2, 3, 4, 5, 6, 7];
  export const fakeReviewsArray = reviewsArrayTemplate.map(()=> fakeReview)


export const fakeLoginData: AuthData = {email:'aaaaa@aaaaa.com', password:datatype.string(1)}

export const fakeLoginServerAnswer: UserLoginData = {
  avatarUrl: internet.avatar(),
  email: 'aaaaa@aaaaa.com',
  id: 3,
  name: datatype.string(8),
  token: datatype.string(8),
};

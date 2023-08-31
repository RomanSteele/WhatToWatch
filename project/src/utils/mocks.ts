import { system, name, internet , datatype } from 'faker';
import { AuthorizationStatus } from '../const';
import { Movie } from '../types/movie';


export const fakeRating: Array<number> = [2, 4, 7, 9, 10, -1, 11];

export const fakeEmail: Array<string> = ['ousekf@kjsenf.com', 'wefwfwe@fsefsd.c'];

export const fakePassword: Array<string> = ['ousekf2346477658', ''];

export const fakeAuthStatus: Array<string> = [AuthorizationStatus.Unknown, AuthorizationStatus.Auth, AuthorizationStatus.NoAuth];

export const makeFakeMovieObject = (): Movie => ({
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

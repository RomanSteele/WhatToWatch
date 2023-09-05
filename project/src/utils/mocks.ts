import { system, name, internet , datatype } from 'faker';
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
  description: "In an effort to thwart Grindelwald's plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, though he's unaware of the dangers that lie ahead. even among the truest friends and family, in an increasingly divided wizarding world.",
  rating: datatype.float({ min: 0, max: 10 }),
  scoresCount: datatype.number({ min: 0, max: 10 }),
  director: name.title(),
  starring: [
    name.title(),
    name.title(),
    name.title(),
  ],
  runTime: 150,
  genre: 'MovieGenre',
  released: datatype.number({ min: 1900, max: 2023 }),
  id: datatype.number({ min: 1 }),
  isFavorite: datatype.boolean(),
  videoLink: system.filePath(),
  previewVideoLink: system.filePath(),
});

const moviesArrayTemplate = [0, 1, 2, 3, 4, 5, 6, 7];
export const fakeMoviesArray = moviesArrayTemplate.map(()=> fakeMovie)

export const fakeReview: Review ={
  comment: 'fake review string',
  date: "2023-07-24T07:05:34.295Z",
  id:  datatype.number({ min: 0, max: 10 }),
  rating:  datatype.number({ min: 0, max: 10 }),
  user: {
  id:  datatype.number({ min: 0, max: 10 }),
  name: 'Jack Jones',
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


export const array = [{
  name: "Gangs of new york",
    posterImage: "https://9.react.pages.academy/static/film/poster/Gangs_of_New_York_Poster.jpg",
    previewImage: "https://9.react.pages.academy/static/film/preview/gangs_of_new_york.jpg",
    backgroundImage: "https://9.react.pages.academy/static/film/background/gangs_of_new_york.jpg",
    backgroundColor: "#A6B7AC",
    description: "In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.",
    rating: 8.8,
    scoresCount: 370881,
    director: "Martin Scorsese",
    starring: [
      "Leonardo DiCaprio",
      "Cameron Diaz",
      "Daniel Day-Lewis"
    ],
    runTime: 167,
    genre: "Crime",
    released: 2002,
    id: 1,
    isFavorite: false,
    videoLink: "https://9.react.pages.academy/static/film/video/bike.mp4",
    previewVideoLink: "https://9.react.pages.academy/static/film/video/traffic.mp4"
},
{
  name: "Fantastic Beasts: The Crimes of Grindelwald",
    posterImage: "https://9.react.pages.academy/static/film/poster/Fantastic_Beasts.jpg",
    previewImage: "https://9.react.pages.academy/static/film/preview/fantastic-beasts-the-crimes-of-grindelwald.jpg",
    backgroundImage: "https://9.react.pages.academy/static/film/background/Fantastic_Beasts.jpg",
    backgroundColor: "#B6A99F",
    description: "In an effort to thwart Grindelwald's plans of raising pure-blood wizards to rule over all non-magical beings, Albus Dumbledore enlists his former student Newt Scamander, who agrees to help, though he's unaware of the dangers that lie ahead. Lines are drawn as love and loyalty are tested, even among the truest friends and family, in an increasingly divided wizarding world.",
    rating: 3.4,
    scoresCount: 160757,
    director: "David Yates",
    starring: [
      "Eddie Redmayne",
      "Katherine Waterston",
      "Dan Fogler"
    ],
    runTime: 134,
    genre: "Fantasy",
    released: 2018,
    id: 2,
    isFavorite: false,
    videoLink: "https://9.react.pages.academy/static/film/video/bubbles.mp4",
    previewVideoLink: "https://9.react.pages.academy/static/film/video/dog.mp4"
},

{
  name: "Aviator",
  posterImage: "https://9.react.pages.academy/static/film/poster/Aviator.jpg",
  previewImage: "https://9.react.pages.academy/static/film/preview/aviator.jpg",
  backgroundImage: "https://9.react.pages.academy/static/film/background/Aviator.jpg",
  backgroundColor: "#D6CDAF",
  description: "A biopic depicting the early years of legendary Director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.",
  rating: 9.8,
  scoresCount: 307174,
  director: "Martin Scorsese",
  starring: [
    "Leonardo DiCaprio",
    "Cate Blanchett",
    "Kate Beckinsale"
  ],
  runTime: 170,
  genre: "Drama",
  released: 2014,
  id: 3,
  isFavorite: false,
  videoLink: "https://9.react.pages.academy/static/film/video/matrix.mp4",
  previewVideoLink: "https://9.react.pages.academy/static/film/video/dog.mp4"

},
{
name: "What We Do in the Shadows",
    posterImage: "https://9.react.pages.academy/static/film/poster/What-We-Do-in-the-Shadows.jpg",
    previewImage: "https://9.react.pages.academy/static/film/preview/what-we-do-in-the-shadows.jpg",
    backgroundImage: "https://9.react.pages.academy/static/film/background/What-We-Do-in-the-Shadows.jpg",
    backgroundColor: "#A39E81",
    description: "A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.",
    rating: 7.2,
    scoresCount: 6173,
    director: "Jemaine Clement",
    starring: [
      "Kayvan Novak",
      "Matt Berry",
      "Natasia Demetriou"
    ],
    runTime: 30,
    genre: "Comedy",
    released: 2019,
    id: 4,
    isFavorite: false,
    videoLink: "https://9.react.pages.academy/static/film/video/bike.mp4",
    previewVideoLink: "https://9.react.pages.academy/static/film/video/dog.mp4"
  }

]

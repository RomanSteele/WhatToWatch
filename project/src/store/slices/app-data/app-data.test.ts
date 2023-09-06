
import { Data } from '../../../types/state';
import { data } from './app-data';
import { loadMovies, setError, loadFavoriteMovies, loadPromoMovie, loadReviews, loadSimilarMovies, loadCurrentMovie } from './app-data';
import { fakeMoviesArray, fakeReviewsArray, fakeMovie, fakeError } from '../../../utils/mocks';

const mockMoviesArray = fakeMoviesArray;
const mockReviewsArray = fakeReviewsArray;
const mockMovie = fakeMovie;
const mockError = fakeError;


describe('Reducer: appData', () => {

const initialState: Data = {
  movies: [],
  favoriteMovies: [],
  similarMovies: [],
  currentMovie:{
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [''],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
  reviews: [],
  promoMovie: {
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [''],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
  error: null,
};


  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change movies in initialState ', () => {
    expect(data.reducer(initialState, loadMovies(mockMoviesArray)))
      .toEqual({ ...initialState, movies: mockMoviesArray });
  })

  it('should change favoriteMovies in initialState ', () => {
    expect(data.reducer(initialState, loadFavoriteMovies(mockMoviesArray)))
      .toEqual({ ...initialState, favoriteMovies: mockMoviesArray });
  })

  it('should change similarMovies in initialState ', () => {
    expect(data.reducer(initialState, loadSimilarMovies(mockMoviesArray)))
      .toEqual({ ...initialState, similarMovies: mockMoviesArray });
  })

  it('should change reviews in initialState ', () => {
    expect(data.reducer(initialState, loadReviews(mockReviewsArray)))
      .toEqual({ ...initialState, reviews: mockReviewsArray });
  })

  it('should change promoMovie in initialState ', () => {
    expect(data.reducer(initialState, loadPromoMovie(mockMovie)))
      .toEqual({ ...initialState, promoMovie: mockMovie });
  })

  it('should change currentMovie in initialState ', () => {
    expect(data.reducer(initialState, loadCurrentMovie(mockMovie)))
      .toEqual({ ...initialState, currentMovie: mockMovie });
  })

  it('should change error in initialState ', () => {
    expect(data.reducer(initialState, setError(mockError[0])))
      .toEqual({ ...initialState, error: mockError[0] });
  })

  it('should not change error in initialState ', () => {
    expect(data.reducer(initialState, setError(mockError[1])))
      .toEqual({ ...initialState });
  })
})

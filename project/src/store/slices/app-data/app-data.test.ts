
import { Data } from '../../../types/state';
import { data } from './app-data';
import { loadMovies, setError, loadFavoriteMovies, loadPromoMovie, loadReviews, loadSimilarMovies, loadCurrentMovie } from './app-data';
import { fakeMoviesArray, fakeReviewsArray, fakeMovie, fakeError } from '../../../utils/mocks';


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
    expect(data.reducer(initialState, loadMovies(fakeMoviesArray)))
      .toEqual({ ...initialState, movies: fakeMoviesArray });
  })

  it('should change favoriteMovies in initialState ', () => {
    expect(data.reducer(initialState, loadFavoriteMovies(fakeMoviesArray)))
      .toEqual({ ...initialState, favoriteMovies: fakeMoviesArray });
  })

  it('should change similarMovies in initialState ', () => {
    expect(data.reducer(initialState, loadSimilarMovies(fakeMoviesArray)))
      .toEqual({ ...initialState, similarMovies: fakeMoviesArray });
  })

  it('should change reviews in initialState ', () => {
    expect(data.reducer(initialState, loadReviews(fakeReviewsArray)))
      .toEqual({ ...initialState, reviews: fakeReviewsArray });
  })

  it('should change promoMovie in initialState ', () => {
    expect(data.reducer(initialState, loadPromoMovie(fakeMovie)))
      .toEqual({ ...initialState, promoMovie: fakeMovie });
  })

  it('should change currentMovie in initialState ', () => {
    expect(data.reducer(initialState, loadCurrentMovie(fakeMovie)))
      .toEqual({ ...initialState, currentMovie: fakeMovie });
  })

  it('should change error in initialState ', () => {
    expect(data.reducer(initialState, setError(fakeError[0])))
      .toEqual({ ...initialState, error: fakeError[0] });
  })

  it('should not change error in initialState ', () => {
    expect(data.reducer(initialState, setError(fakeError[1])))
      .toEqual({ ...initialState });
  })
})

import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import MoviePage from './movie-page';
import { fakeMoviesArray, fakeMovie, fakeReview, fakeUserData } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';



const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockMoviesArray = fakeMoviesArray;
const mockMovie = fakeMovie;
const mockReview = fakeReview;
const mockUserData = fakeUserData;


describe('Component: MoviePage', () => {


  it('should render MoviePage logged in', async () => {

    const store = mockStore({
      DATA: {currentMovie: mockMovie, movies: mockMoviesArray, reviews:[mockReview], similarMovies:[mockMoviesArray[1]]},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: mockUserData},
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MoviePage isLoading={false} />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.description}`,'i'))).toBeInTheDocument();

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render MoviePage logged out', async () => {

    const store = mockStore({
      DATA: {currentMovie: mockMovie, movies: mockMoviesArray, reviews:[mockReview], similarMovies:[mockMoviesArray[1]]},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, userLoginData: mockUserData},
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MoviePage isLoading={false} />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.description}`,'i'))).toBeInTheDocument();

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render Spinner because of loading status', async () => {

    const store = mockStore({
      DATA: {currentMovie: mockMovie, movies: mockMoviesArray, reviews:[mockReview], similarMovies:[mockMoviesArray[1]]},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, userLoginData: mockUserData},
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MoviePage isLoading={true} />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });


});

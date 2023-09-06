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



describe('Component: MoviePage', () => {


  it('should render MoviePage logged in', async () => {

    const store = mockStore({
      DATA: {currentMovie: fakeMovie, movies: fakeMoviesArray, reviews:[fakeReview], similarMovies:[fakeMoviesArray[1]]},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: fakeUserData},
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



    expect(screen.getByText(new RegExp(`${fakeMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.description}`,'i'))).toBeInTheDocument();

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });


});

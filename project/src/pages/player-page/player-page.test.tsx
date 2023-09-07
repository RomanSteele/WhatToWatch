import { render, screen } from '@testing-library/react';
import { fakeMoviesArray } from '../../utils/mocks';
import { HelmetProvider } from 'react-helmet-async';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import App from '../../components/app/app';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockMovies = fakeMoviesArray;
const mockStore = configureMockStore();
const mockMoviesArray = fakeMoviesArray;
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth },
  DATA: {movies: mockMoviesArray},
  ACTION: {isLoading: false},
});

describe('PlayerPage component', () => {

  it('should render Player when user navigate to "/player/:id" ', async () => {
    history.push(`${AppRoute.Player}/${mockMovies[0].id}`);
    HTMLMediaElement.prototype.play  = jest.fn();


    render(
      <Provider store={store}>
      <HelmetProvider>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </HelmetProvider>
      </Provider>
    );


    expect(screen.getByText(/Exit/i)).toBeInTheDocument();

  });
});



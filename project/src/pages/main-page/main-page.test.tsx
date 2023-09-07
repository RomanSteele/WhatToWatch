import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import MainPage from './main-page';
import { fakeGenre, fakeMovie, fakeUserData } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';



const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockGenre = fakeGenre;
const mockMovie = fakeMovie;
const mockUserData = fakeUserData;


describe('Component: MainPage', () => {


  it('should render MainPage logged in', async () => {

    const store = mockStore({
      DATA: {currentMovie: mockMovie, promoMovie: mockMovie},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: mockUserData},
      ACTION: {genre: mockGenre}
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MainPage movies={[mockMovie]} isLoading={false}  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );


    expect(screen.getByText(new RegExp(`${mockMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.released}`,'i'))).toBeInTheDocument();

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });


  it('should render MainPage logged out', async () => {

    const store = mockStore({
      DATA: {currentMovie: mockMovie, promoMovie: mockMovie},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, userLoginData: mockUserData},
      ACTION: {genre: mockGenre}
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MainPage movies={[mockMovie]} isLoading={false}  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );


    expect(screen.getByText(new RegExp(`${fakeMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.released}`,'i'))).toBeInTheDocument();

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });


  it('should render Spinner becuase of loading status', async () => {

    const store = mockStore({
      DATA: {currentMovie: mockMovie, promoMovie: mockMovie},
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, userLoginData: mockUserData},
      ACTION: {genre: mockGenre}
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MainPage movies={[mockMovie]} isLoading={true}  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );


    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });

});

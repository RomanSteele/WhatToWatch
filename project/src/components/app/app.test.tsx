import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {AuthorizationStatus, AppRoute, TimeConvertion} from '../../const';
import App from './app';
import { fakeMoviesArray, fakeMovie, fakeUserData } from '../../utils/mocks';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

const mockMovie = fakeMovie;
const mockMoviesArray = fakeMoviesArray;

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: fakeUserData, },
  DATA: {movies: mockMoviesArray, promoMovie: mockMovie, favoriteMovies: mockMoviesArray, currentMovie: mockMovie , similarMovies: mockMoviesArray},
  ACTION: {isLoading: false},
});

const storeNoAuth = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, userLoginData: fakeUserData},
  DATA: {movies: mockMoviesArray, promoMovie: mockMovie},
  ACTION: {isLoading: false},
});

const history = createMemoryHistory();

const testApp = (
  <Provider store={store}>
    <HelmetProvider>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </HelmetProvider>
  </Provider>
);


describe('Application Routing', () => {


  it('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(testApp);

    expect(screen.getByText(new RegExp(`${fakeMovie.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });


  it('should render "SignInPage" when user navigate to "/login"', async () => {
    history.push(AppRoute.Login);

    render(
    <Provider store={storeNoAuth}>
      <HelmetProvider>
        <HistoryRouter history={history}>
          <App />
        </HistoryRouter>
      </HelmetProvider>
    </Provider>);

    await userEvent.type(screen.getByTestId('user-email'), 'email@email.com');
    await userEvent.type(screen.getByTestId('user-password'), '1242645');

    const elementWithText = screen.getAllByText(/Sign in/i);

    expect(elementWithText).not.toBeNull();
    expect(screen.getByDisplayValue(/email@email.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1242645/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });


  it('should render "MyListPage" when user navigate to "/favorites"', async () => {
    history.push(AppRoute.MyList);

    render(testApp);

    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMoviesArray[3].name}`, 'i')));
  });


  it('should render "MoviePage" when user navigate to "/movie"', async () => {
    history.push(AppRoute.SelectedMovie);
    window.scrollTo = jest.fn();


    render(testApp);


    const elementWithText = screen.getAllByText(new RegExp(`${fakeMovie.rating}`, 'i'));
    expect(elementWithText).not.toBeNull();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.rating}`, 'i')));
  });


  it('should render "NotFoundPage" when user navigate to "*" ', async () => {
    history.push(`/${AppRoute.NotFound}`);


    render(testApp);

    expect(screen.getByText(/NOT FOUND!/i)).toBeInTheDocument();

  });


  it('should render "AddReviewPage" when user navigate to "/movie/:id/review" ', async () => {
    history.push(`${AppRoute.Movie}/${fakeMovie.id}/review`);


    render(testApp);

    expect(screen.getByText(/Post/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.name}`, 'i'))).toBeInTheDocument();

  });


  it('should render "Player" when user navigate to "/player/:id" ', async () => {
    history.push(`${AppRoute.Player}/${mockMoviesArray[0].id}`);
    HTMLMediaElement.prototype.play  = jest.fn();


    render(testApp);

    const getLeftTime = (runTime: number) =>
    new Date(((runTime * TimeConvertion.SecondsInMinute)) * TimeConvertion.MilisecondsInSecond).toUTCString().split(/ /)[TimeConvertion.Limit];


    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${getLeftTime(mockMoviesArray[0].runTime)}`, 'i'))).toBeInTheDocument();
    expect(HTMLMediaElement.prototype.play).toBeCalledTimes(1);
  });


});

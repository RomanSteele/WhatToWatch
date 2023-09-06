import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import MyListPage from './my-list-page';
import { fakeMovie, fakeUserData } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';



const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockMovie = fakeMovie;
const mockUserData = fakeUserData;


describe('Component: MyListPage', () => {


  it('should render MyListPage logged in', async () => {

    const store = mockStore({
      DATA: {favoriteMovies:[mockMovie]},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: mockUserData},
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MyListPage />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockMovie.name}`,'i'))).toBeInTheDocument();

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });


  it('should render MyListPage logged in with no favorite movies', async () => {

    const store = mockStore({
      DATA: {favoriteMovies:[]},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: mockUserData},
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MyListPage />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );



    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing here yet!/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });


});

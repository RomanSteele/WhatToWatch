import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import NotFoundPage from './not-found-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { fakeUserData } from '../../utils/mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockUserData = fakeUserData;

describe('Component: NotFoundPage', () => {


  it('should render NotFoundPage logged out', async () => {

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth, userLoginData: mockUserData},
    });


    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundPage />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );



    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/NOT FOUND!/i)).toBeInTheDocument();
  });

  it('should render NotFoundPage logged in', async () => {

    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: mockUserData},
    });


    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundPage  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );


    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/NOT FOUND!/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });


});

import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import UserBlock from './user-block';
import { fakeUserData } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

const mockUserData = fakeUserData;
const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: mockUserData},
});

const store1 = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth,},
});


describe('Component: UserBlock', () => {


  it('should render Sign Out becuase of Auth status', async () => {

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <UserBlock  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render Sign in becuase of NoAuth status', async () => {

    render(
    <Provider store={store1}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <UserBlock  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

});

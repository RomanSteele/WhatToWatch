import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { fakeUserData } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import UserBlockSignOut from './user-block-sign-out';

const mockUserData = fakeUserData;
const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  USER: {userLoginData: mockUserData, authorizationStatus: AuthorizationStatus.Auth},
});

describe('Component: UserBlockSignOut', () => {

  it('should render sign out', async () => {

    render(
      <Provider store={store}>
      <HistoryRouter history={history}>
      <HelmetProvider>
        <UserBlockSignOut  />
        </HelmetProvider>
    </HistoryRouter>
    </Provider>
    )

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});

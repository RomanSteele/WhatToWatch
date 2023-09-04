import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../history-route/history-route';
import UserBlockSignIn from './user-block-sign-in';


const history = createMemoryHistory();

describe('Component: UserBlockSignIn', () => {

  it('should render sign in', async () => {

    render(
      <HistoryRouter history={history}>
      <HelmetProvider>
        <UserBlockSignIn  />
        </HelmetProvider>
    </HistoryRouter>
    )

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});

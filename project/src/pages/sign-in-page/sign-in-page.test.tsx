import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import SignInPage from './sign-in-page';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: SignInPage', () => {

  it('should render SignInPage', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <SignInPage />
        </HelmetProvider>
      </HistoryRouter>
    );


    const elementWithText = screen.getAllByText(/Sign in/i)

    expect(elementWithText).not.toBeNull();
    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  it('should render SignInPage with entered email and password', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <SignInPage />
        </HelmetProvider>
      </HistoryRouter>
    );


    await userEvent.type(screen.getByTestId('user-email'), 'email@email.com');
    await userEvent.type(screen.getByTestId('user-password'), '1242645');

    const elementWithText = screen.getAllByText(/Sign in/i);

    expect(elementWithText).not.toBeNull();
    expect(screen.getByDisplayValue(/email@email.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1242645/i)).toBeInTheDocument();
  });

  it('should render SignInPage with entered email and empty password error', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <SignInPage />
        </HelmetProvider>
      </HistoryRouter>
    );

    const postButton = screen.getByTestId('test-button')

    await userEvent.type(screen.getByTestId('user-email'), 'email@email.com');

    await userEvent.click(postButton);

    expect(screen.getByDisplayValue(/email@email.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid password/i)).toBeInTheDocument();
  });

  it('should render SignInPage with entered password and empty email error', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <SignInPage />
        </HelmetProvider>
      </HistoryRouter>
    );

    const postButton = screen.getByTestId('test-button')

    await userEvent.type(screen.getByTestId('user-password'), '123');

    await userEvent.click(postButton);

    expect(screen.getByDisplayValue(/123/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid email/i)).toBeInTheDocument();
  });

  it('should render SignInPage with empty email and password error', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <SignInPage />
        </HelmetProvider>
      </HistoryRouter>
    );

    const postButton = screen.getByTestId('test-button')


    await userEvent.click(postButton);

    expect(screen.getByText(/Please enter a valid password and email address/i)).toBeInTheDocument();
  });


});

import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import SignInPage from './sign-in-page';




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


});

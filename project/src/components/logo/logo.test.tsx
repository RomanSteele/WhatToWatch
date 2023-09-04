import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Logo from './logo';


const history = createMemoryHistory();


const fakeFooter = (
    <HistoryRouter history={history}>
      <HelmetProvider>
        <Logo />
      </HelmetProvider>
    </HistoryRouter>

);



describe('Component: Footer', () => {


  it('should render footer', async () => {

    render(fakeFooter);

    expect(screen.getByText(/T/i)).toBeInTheDocument();
  });
});

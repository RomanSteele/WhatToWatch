import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Footer from './footer';


const history = createMemoryHistory();


describe('Component: Footer', () => {


  it('should render footer', async () => {

    render(
    <HistoryRouter history={history}>
      <HelmetProvider>
        <Footer />
      </HelmetProvider>
    </HistoryRouter>);

    expect(screen.getByText(/2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});

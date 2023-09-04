import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import Breadcrumbs from './breadcrumbs';
import { fakeMovie } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore();

const fakeBreadcrumbs = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <Breadcrumbs movieName={fakeMovie.name} movieId={fakeMovie.id} />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);



describe('Component: Breadcrumbs', () => {


  it('should render add review and movie name', async () => {

    render(fakeBreadcrumbs);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.name}`, 'i'))).toBeInTheDocument();
  });
});

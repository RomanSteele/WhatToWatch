import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogGenreList from './catalog-genre-list';
import { fakeMovie } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  ACTION: {genre: fakeMovie.genre},
});

const fakeAddReviewForm = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <CatalogGenreList movies={[fakeMovie]} />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);



describe('Component: CatalogGenreList', () => {


  it('should render genres list and movie list', async () => {

    render(fakeAddReviewForm);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.genre}`, 'i'))).toBeInTheDocument();

  });
});

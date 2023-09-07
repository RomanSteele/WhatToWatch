import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogGenreList from './catalog-genre-list';
import { fakeMovie, fakeMoviesArray } from '../../utils/mocks';
import { GenresStart } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockMovie = fakeMovie;
const mockMovieArray = fakeMoviesArray

const store = mockStore({
  ACTION: {genre: GenresStart},
});


describe('Component: CatalogGenreList', () => {


  it('should render genres list and movie list', async () => {

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <CatalogGenreList movies={[mockMovie]} />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.genre}`, 'i'))).toBeInTheDocument();

  });


  it('should render genres list and movie list + show more button', async () => {

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <CatalogGenreList movies={[...mockMovieArray,mockMovie]} />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>);

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovieArray[1].genre}`, 'i'))).toBeInTheDocument();

  });
});

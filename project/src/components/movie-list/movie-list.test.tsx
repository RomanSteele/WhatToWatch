import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MovieList from './movie-list';
import { fakeMoviesArray } from '../../utils/mocks';

const history = createMemoryHistory();

const mockMovies = fakeMoviesArray

describe('Component: MovieList', () => {


  it('should render movie list', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MovieList movies={mockMovies} />
        </HelmetProvider>
      </HistoryRouter>
    );


    expect(screen.getByText(new RegExp(`${mockMovies[0].name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovies[1].name}`,'i'))).toBeInTheDocument();
  });


});

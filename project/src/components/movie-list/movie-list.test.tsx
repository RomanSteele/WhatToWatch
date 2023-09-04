import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MovieList from './movie-list';
import { fakeMovie } from '../../utils/mocks';

const history = createMemoryHistory();




describe('Component: MovieList', () => {


  it('should movie list', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MovieList movies={[fakeMovie]} />
        </HelmetProvider>
      </HistoryRouter>
    );


    expect(screen.getByText(new RegExp(`${fakeMovie.name}`,'i'))).toBeInTheDocument();
  });


});

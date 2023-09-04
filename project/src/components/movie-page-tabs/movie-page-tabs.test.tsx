import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MoviePageTabs from './movie-page-tabs';
import { fakeMovie, fakeReviewsArray } from '../../utils/mocks';
import { TabKeys } from '../../const';

const history = createMemoryHistory();


describe('Component: MoviePageTabs', () => {


  it('should render overview tab and buttons with Overview, Details and Reviews', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MoviePageTabs movie={fakeMovie} reviews={fakeReviewsArray} />
        </HelmetProvider>
      </HistoryRouter>
    );




    expect(screen.getByText(new RegExp(`${TabKeys[0].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${TabKeys[1].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${TabKeys[2].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.rating}`,'i'))).toBeInTheDocument();
  });


});

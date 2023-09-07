import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import MoviePageTabs from './movie-page-tabs';
import { fakeMovie, fakeReview } from '../../utils/mocks';
import { TabKeys } from '../../const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

const mockReview= fakeReview;
const mockMovie = fakeMovie;


describe('Component: MoviePageTabs', () => {


  it('should render overview tab and buttons with Overview, Details and Reviews', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MoviePageTabs movie={mockMovie} reviews={[mockReview]} />
        </HelmetProvider>
      </HistoryRouter>
    );


    expect(screen.getByText(new RegExp(`${TabKeys[0].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${TabKeys[1].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${TabKeys[2].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.rating}`,'i'))).toBeInTheDocument();
  });

  it('should render tabs with Details tab active', async () => {

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MoviePageTabs movie={mockMovie} reviews={[mockReview]} />
        </HelmetProvider>
      </HistoryRouter>
    );

    const detailsButton = screen.getByTestId('Details-test')

    await userEvent.click(detailsButton);

    expect(screen.getByText(new RegExp(`${TabKeys[0].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${TabKeys[1].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${TabKeys[2].title}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.genre}`,'i'))).toBeInTheDocument();

    })

    it('should render tabs with Reviews tab active', async () => {

      render(
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MoviePageTabs movie={mockMovie} reviews={[mockReview]} />
          </HelmetProvider>
        </HistoryRouter>
      );

      const reviewsButton = screen.getByTestId('Reviews-test')

      await userEvent.click(reviewsButton);

      expect(screen.getByText(new RegExp(`${TabKeys[0].title}`,'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${TabKeys[1].title}`,'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${TabKeys[2].title}`,'i'))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${mockReview.comment}`,'i'))).toBeInTheDocument();

      })

})

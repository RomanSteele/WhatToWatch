import {fireEvent, render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import SingleMovieCard from './single-movie-card';
import { fakeMovie, fakeMoviesArray } from '../../utils/mocks';
import { VIDEO_PREVIEW_DELAY } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const mockMovie = fakeMovie;
const mockMovieArray = fakeMoviesArray;

const store = mockStore({
  USER: {authorizationStatus: true},
  DATA: {favoriteMovies: mockMovieArray},
});


describe('Component: SingleMovieCard', () => {

  const fakeSingleMovieCard = (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <SingleMovieCard  movie={mockMovie} autoPlay={true}  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>);

it('should render single card', async () => {

  render (fakeSingleMovieCard);

  expect(screen.getByText(new RegExp(`${mockMovie.name}`,'i'))).toBeInTheDocument();
});

  it('should render single card and start playing video', async () => {

    render (fakeSingleMovieCard);

    const videoElement = screen.getByTestId('video-element');


    fireEvent.mouseEnter(videoElement);

    setTimeout(() => {
      expect(videoElement).toHaveProperty('paused', false);
    }, VIDEO_PREVIEW_DELAY);
  });


  it('should render single card and stop video ', async () => {

    render (fakeSingleMovieCard);

    const videoElement:HTMLVideoElement = screen.getByTestId('video-element');

  fireEvent.mouseEnter(videoElement);


  expect(videoElement).toHaveProperty('paused', true);
  expect(videoElement.currentTime).toBe(0);
  });


});

import {render, screen} from '@testing-library/react';
import MoviePageOverview from './movie-page-overview';
import { fakeMovie } from '../../utils/mocks';

const mockMovie = fakeMovie;

describe('Component: MoviePageOverview', () => {

  it('should render overview tab', async () => {

    render(
          <MoviePageOverview movie={mockMovie} />
    );

    expect(screen.getByText(new RegExp(`${mockMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.rating}`,'i'))).toBeInTheDocument();
  });


});

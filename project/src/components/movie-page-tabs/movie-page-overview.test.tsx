import {render, screen} from '@testing-library/react';
import MoviePageOverview from './movie-page-overview';
import { fakeMovie } from '../../utils/mocks';


describe('Component: MoviePageOverview', () => {

  it('should render overview tab', async () => {

    render(
          <MoviePageOverview movie={fakeMovie} />
    );

    expect(screen.getByText(new RegExp(`${fakeMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.rating}`,'i'))).toBeInTheDocument();
  });


});

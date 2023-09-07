import {render, screen} from '@testing-library/react';
import MoviePageDetails from './movie-page-details';
import { fakeMovie } from '../../utils/mocks';

const mockMovie = fakeMovie;

describe('Component: MoviePageDetails', () => {

  it('should render details tab', async () => {

    render(
          <MoviePageDetails movie={mockMovie} />
    );

    expect(screen.getByText(new RegExp(`${mockMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.genre}`,'i'))).toBeInTheDocument();
  });


});

import {render, screen} from '@testing-library/react';
import MoviePageDetails from './movie-page-details';
import { fakeMovie } from '../../utils/mocks';


describe('Component: MoviePageOverview', () => {

  it('should render details tab', async () => {

    render(
          <MoviePageDetails movie={fakeMovie} />
    );

    expect(screen.getByText(new RegExp(`${fakeMovie.director}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.genre}`,'i'))).toBeInTheDocument();
  });


});

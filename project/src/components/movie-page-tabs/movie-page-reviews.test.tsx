import {render, screen} from '@testing-library/react';
import MoviePageReviews from './movie-page-reviews';
import { fakeReview } from '../../utils/mocks';


describe('Component: MoviePageReviews', () => {

  it('should render reviews tab', async () => {

    render(
          <MoviePageReviews reviews={[fakeReview]} />
    );

    expect(screen.getByText(new RegExp(`${fakeReview.comment}`,'i'))).toBeInTheDocument();
  });


});

import {render, screen} from '@testing-library/react';
import MoviePageReviews from './movie-page-reviews';
import { fakeReview } from '../../utils/mocks';

const mockReview = fakeReview;

describe('Component: MoviePageReviews', () => {

  it('should render reviews tab', async () => {

    render(
          <MoviePageReviews reviews={[mockReview]} />
    );

    expect(screen.getByText(new RegExp(`${mockReview.comment}`,'i'))).toBeInTheDocument();
  });


});

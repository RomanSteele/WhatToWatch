import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import SingleReview from './single-review';
import { fakeReview } from '../../utils/mocks';

const mockReview = fakeReview;

const history = createMemoryHistory();

const fakeSingleReview = (
    <HistoryRouter history={history}>
      <HelmetProvider>
        <SingleReview review={mockReview} />
      </HelmetProvider>
    </HistoryRouter>
);


describe('Component: SingleReview', () => {


  it('should render single review', async () => {

    render(fakeSingleReview);


    expect(screen.getByText(new RegExp(`${mockReview.comment}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockReview.user.name}`,'i'))).toBeInTheDocument();
  });
});

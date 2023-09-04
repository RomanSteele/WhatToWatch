import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import SingleReview from './single-review';
import { fakeReview } from '../../utils/mocks';


const history = createMemoryHistory();

const fakeSingleReview = (
    <HistoryRouter history={history}>
      <HelmetProvider>
        <SingleReview review={fakeReview} />
      </HelmetProvider>
    </HistoryRouter>
);


describe('Component: SingleReview', () => {


  it('should render single review', async () => {

    render(fakeSingleReview);


    expect(screen.getByText(new RegExp(`${fakeReview.comment}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeReview.user.name}`,'i'))).toBeInTheDocument();
  });
});

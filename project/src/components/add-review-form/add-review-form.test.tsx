import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import AddReviewForm from './add-review-form';
import { fakeId } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  ACTION: {isLoading: false},
});

const mockId= fakeId;

describe('Component: AddReviewForm', () => {

  it('should render review and post button', async () => {

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <AddReviewForm movieId={mockId} />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>);

    await userEvent.type(screen.getByTestId('review-text'), 'review');
    const elementWithText = screen.getAllByText(/Rating/i);

    expect(elementWithText).not.toBeNull();
    expect(screen.getByDisplayValue(/review/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });
});

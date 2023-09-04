import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import AddReviewPage from './add-review-page';
import { fakeMovie, fakeReview, fakeUserData } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore();
const history = createMemoryHistory();



describe('Component: AddReviewPage', () => {


  it('should render AddReviewPage with entered comment', async () => {

    const store = mockStore({
      DATA: {currentMovie: fakeMovie},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: fakeUserData},
      ACTION: {isLoading: false},
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <AddReviewPage  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    await userEvent.type(screen.getByTestId('review-text'), fakeReview.comment);

    const elementWithText = screen.getAllByText(/Rating/i);

    expect(screen.getByDisplayValue(new RegExp(`${fakeReview.comment}`,'i'))).toBeInTheDocument();

    expect(elementWithText).not.toBeNull();

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });


});

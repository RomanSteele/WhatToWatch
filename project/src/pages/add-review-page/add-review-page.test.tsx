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
const mockMovie = fakeMovie;
const mockReview = fakeReview;
const mockUserData = fakeUserData;


describe('Component: AddReviewPage', () => {

  const store = mockStore({
    DATA: {currentMovie: mockMovie},
    USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: mockUserData},
    ACTION: {isLoading: false},
  });

  it('should render AddReviewPage ', async () => {

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <AddReviewPage  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );


    const elementWithText = screen.getAllByText(/Rating/i);
    const elementWithPlaceholderText = screen.getAllByPlaceholderText(/Review text/i);

    expect(elementWithText).not.toBeNull();
    expect(elementWithPlaceholderText).not.toBeNull();

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });

  it('should render AddReviewPage with entered comment', async () => {

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <AddReviewPage  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    await userEvent.type(screen.getByTestId('review-text'), mockReview.comment);

    const elementWithText = screen.getAllByText(/Rating/i);

    expect(screen.getByDisplayValue(new RegExp(`${mockReview.comment}`,'i'))).toBeInTheDocument();

    expect(elementWithText).not.toBeNull();

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });


});

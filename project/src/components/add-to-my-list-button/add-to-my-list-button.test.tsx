import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import AddToMyListButton from './add-to-my-list-button';
import { fakeId, fakeMoviesArray } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  USER: {authorizationStatus: true},
  DATA: {favoriteMovies: fakeMoviesArray},
});




describe('Component: AddToMyListButton', () => {


  it('should render button', async () => {

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <AddToMyListButton movieId={fakeId} />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );

    const elementsByTestId = screen.getByTestId(/not-in-list/i);

    expect(elementsByTestId).toBeInTheDocument();


    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });


});

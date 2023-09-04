import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import MainPage from './main-page';
import { fakeGenre, fakeMovie, fakeUserData } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';



const mockStore = configureMockStore();
const history = createMemoryHistory();



describe('Component: MainPage', () => {


  it('should render MainPage logged in', async () => {

    const store = mockStore({
      DATA: {currentMovie: fakeMovie, promoMovie: fakeMovie},
      USER: {authorizationStatus: AuthorizationStatus.Auth, userLoginData: fakeUserData},
      ACTION: {genre: fakeGenre}
    });

    render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <MainPage movies={[fakeMovie]} isLoading={false}  />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
    );





    expect(screen.getByText(new RegExp(`${fakeMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.released}`,'i'))).toBeInTheDocument();

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });


});

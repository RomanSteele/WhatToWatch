import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import PromoMovie from './promo-movie';
import { fakeMovie } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockMovie = fakeMovie;

const store = mockStore({
  DATA: {promoMovie: mockMovie},
  USER: {authorizationStatus: AuthorizationStatus.Auth}
});

const fakePromoMovieComponent = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <PromoMovie />
      </HelmetProvider>
    </HistoryRouter>
  </Provider>
);



describe('Component: PromoMovie', () => {


  it('should render PromoMovie component', async () => {

    render(fakePromoMovieComponent);

    expect(screen.getByText(new RegExp(`${mockMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.genre}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockMovie.released}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();

  });
});

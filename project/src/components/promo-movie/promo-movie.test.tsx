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

const store = mockStore({
  DATA: {promoMovie: fakeMovie},
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

    expect(screen.getByText(new RegExp(`${fakeMovie.name}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.genre}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${fakeMovie.released}`,'i'))).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();

  });
});

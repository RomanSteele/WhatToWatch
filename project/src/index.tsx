
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchMoviesAction, fetchPromoMovieAction, fetchUserAction } from './store/api-actions';
import App from './components/app/app';
import ErrorModalMessage from './components/error-modal-message/error-modal-message';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './components/browser-history';

async function initializeApp() {
  await store.dispatch(fetchMoviesAction());
  await store.dispatch(fetchUserAction());
  await store.dispatch(fetchPromoMovieAction());

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  )

root.render(
  <>
    <Provider store={store}>
      <ErrorModalMessage/>
      <HelmetProvider>
    <HistoryRouter history = {browserHistory}>
        <App />

        </HistoryRouter>
  </HelmetProvider>
    </Provider>
  </>,
);
}

initializeApp();

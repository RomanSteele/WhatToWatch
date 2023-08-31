
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { fetchMoviesAction, fetchPromoMovieAction, fetchUserAction } from './store/api-actions';
import { store } from './store';
import App from './components/app/app';
import ErrorModalMessage from './components/error-modal-message/error-modal-message';

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
        <App />
    </Provider>
  </>,
);
}

initializeApp();

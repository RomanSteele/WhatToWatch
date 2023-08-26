
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { fetchMoviesAction, fetchPromoMovieAction } from './store/api-actions';
import { store } from './store';
import ErrorModalMessage from './components/error-modal-message/error-modal-message';
import {checkAuthAction} from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchMoviesAction());
store.dispatch(fetchPromoMovieAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <Provider store={store}>
      <ErrorModalMessage/>
      <App />
    </Provider>
  </>,
);

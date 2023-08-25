
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { fetchMoviesAction } from './store/api-actions';
import { store } from './store';

store.dispatch(fetchMoviesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>,
);

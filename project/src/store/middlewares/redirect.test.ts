import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';
import {AppRoute} from '../../const';
import {State} from '../../types/state';


jest.mock('../../components/browser-history', () => fakeHistory);

const fakeHistory = {
  location: {pathname: ''},
    push(path: string) {
      this.location.pathname = path;
  },
};

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {

  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

  it('should not redirect to /favorites because of unknown action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.MyList});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.MyList);
  });
});

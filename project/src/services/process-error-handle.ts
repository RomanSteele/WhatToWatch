import {store} from '../store';
import { setError } from '../store/slices/app-data/app-data';
import {clearErrorAction} from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

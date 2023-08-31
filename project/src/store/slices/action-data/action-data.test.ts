
import { GenresStart } from '../../../const';
import { actionData } from './action-data';
import { updateGenre , changeLoadingStatus } from './action-data';
import { fakeGenre } from '../../../utils/mocks';


describe('Reducer: actionData', () => {

const initialState = {
  genre: GenresStart,
  isLoading: true,
};

const loadingStatusChange = false;

  it('without additional parameters should return initial state', () => {
    expect(actionData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change isLoading to false', () => {
    const state = initialState;
    expect(actionData.reducer(state, changeLoadingStatus(loadingStatusChange)))
    .toEqual({ ...initialState, isLoading: loadingStatusChange });
  });

  it('should change genre to Drama', () => {
    const state = initialState;
    expect(actionData.reducer(state, updateGenre(fakeGenre)))
      .toEqual({ ...initialState, genre: fakeGenre });
  });


});


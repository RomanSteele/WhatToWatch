
import { AuthorizationStatus } from '../../../const';
import { userData } from './user-data';
import { requireAuthorization, loadUserData } from './user-data';
import { UserData } from '../../../types/state';
import { fakeUserData } from '../../../utils/mocks';


const mockUserData = fakeUserData;

describe('Reducer: userData', () => {

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userLoginData: {
    avatarUrl: '',
    email: '',
    id: 0,
    name: '',
    token: '',
  },
};


  it('without additional parameters should return initial state', () => {
    expect(userData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should change authorizationStatus in initialState', () => {
    const state = initialState;
    expect(userData.reducer(state, requireAuthorization(AuthorizationStatus.Unknown)))
    .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.Unknown });

    expect(userData.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
    .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.Auth });

    expect(userData.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
    .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.NoAuth });
  });


  it('should change userLoginData ', () => {
    const state = initialState;
    expect(userData.reducer(state, loadUserData(mockUserData)))
      .toEqual({ ...initialState, userLoginData: mockUserData });
  })
})

import { combineReducers } from '@reduxjs/toolkit';
import { data } from './slices/app-data/app-data';
import { userData } from './slices/user-data/used-data';
import { actionData } from './slices/action-data/action-data';
import { NameSpace } from '../const';


export const rootReducer = combineReducers({
  [NameSpace.Data]: data.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Action]: actionData.reducer,
});

import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { data } from './slices/app-data/app-data';
import { userData } from './slices/user-data/used-data';
import { actionData } from './slices/action-data/action-data';


export const rootReducer = combineReducers({
  [NameSpace.Data]: data.reducer,
  [NameSpace.User]: userData.reducer,
  [NameSpace.Action]: actionData.reducer,
});

import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../../../types/state";
import { AuthorizationStatus, NameSpace } from "../../../const";

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

export const userData = createSlice ({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    loadUserData: (state, action) => {
      state.userLoginData = action.payload;
    },
  },
});

export const { requireAuthorization, loadUserData } = userData.actions;

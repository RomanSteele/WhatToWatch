import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus, NameSpace } from "../../../const";
import { UserData } from "../../../types/state";


const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userData = createSlice ({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },

  },
});

export const { requireAuthorization } = userData.actions;

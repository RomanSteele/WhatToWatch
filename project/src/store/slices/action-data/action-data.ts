import { createSlice } from '@reduxjs/toolkit';
import { ActionData } from '../../../types/state';
import { GenresStart, NameSpace } from '../../../const';

const initialState: ActionData = {
  genre: GenresStart,
  isLoading: true,
};

export const actionData = createSlice ({
  name: NameSpace.Action,
  initialState,
  reducers: {
    updateGenre: (state, action) => {
      state.genre = action.payload;
    },
    changeLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },

  },
});

export const { updateGenre , changeLoadingStatus } = actionData.actions;

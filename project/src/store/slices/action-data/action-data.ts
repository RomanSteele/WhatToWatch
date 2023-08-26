import { createSlice } from '@reduxjs/toolkit';
import { ActionData } from '../../../types/state';
import { GenresStart, NameSpace } from '../../../const';

const initialState: ActionData = {
  genre: GenresStart,
};

export const actionData = createSlice ({
  name: NameSpace.Action,
  initialState,
  reducers: {
    updateGenre: (state, action) => {
      state.genre = action.payload;
    },
  },
});

export const { updateGenre } = actionData.actions;

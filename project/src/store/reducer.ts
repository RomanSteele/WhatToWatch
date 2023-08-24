import {createReducer} from '@reduxjs/toolkit';
import { updateGenre } from './action';

const startGenre = 'All genres';

const initialState = {
  genre: startGenre,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateGenre, (state, action) => {
      state.genre = action.payload;
    });
});

export { reducer };

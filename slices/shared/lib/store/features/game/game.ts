import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IGameState = {

}

const initialState: IGameState = {

};

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
  },
  selectors: {

  }
});

export const {

} = game.actions;

export const {

} = game.selectors;

export default game.reducer;
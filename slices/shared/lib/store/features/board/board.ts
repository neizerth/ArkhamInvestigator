import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IBoardState = {

}

const initialState: IBoardState = {

};

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
  },
  selectors: {

  }
});

export const {

} = board.actions;

export const {

} = board.selectors;

export default board.reducer;
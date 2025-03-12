import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Story } from '@shared/model';
import { createSliceState } from 'redux-toolkit-helpers';
import { loadCoreData } from '../app/actions/api';

export type IStoriesState = {
  stories: Story[]
}

const initialState: IStoriesState = {
  stories: []
};

export const stories = createSlice({
  name: 'stories',
  ...createSliceState(initialState),
  extraReducers(builder) {
    builder.addCase(loadCoreData.fulfilled, (state, { payload }) => {
      const { stories } = payload;
      state.stories = stories.filter(({ investigators }) => investigators.length > 0);
    })
  }
});

export const {
  selectStories
} = stories.selectors;

export default stories.reducer;
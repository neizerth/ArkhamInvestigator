import { createSliceSelector } from '@/features/slice/createSliceSelector';
import { createSliceSetter } from '@/features/slice/createSliceSetter';
import { IStory } from '@/types/api';
import { createSlice } from '@reduxjs/toolkit';

export type IStoriesState = {
  stories: IStory[]
}

const initialState: IStoriesState = {
  stories: []
};

export const stories = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: createSliceSetter('stories')
  },
  selectors: {
    selectStories: createSliceSelector('stories')
  }
});

export const {
  setStories
} = stories.actions;

export const {
  selectStories
} = stories.selectors;

export default stories.reducer;
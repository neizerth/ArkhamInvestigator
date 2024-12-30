import { createSliceSelector } from '@/features/slice/createSliceSelector';
import { createSliceSetter } from '@/features/slice/createSliceSetter';
import { IInvestigator } from '@/types/api';
import { Nullable } from '@/types/common';
import { createSlice } from '@reduxjs/toolkit';

export type IInvestigatorState = {
  investigator: Nullable<IInvestigator>
}

const initialState: IInvestigatorState = {
  investigator: null
};

export const investigator = createSlice({
  name: 'investigator',
  initialState,
  reducers: {
    setInvesigator: createSliceSetter('investigator')
  },
  selectors: {
    selectInvesigator: createSliceSelector('investigator')
  }
});

export const {
  setInvesigator
} = investigator.actions;

export const {
  selectInvesigator
} = investigator.selectors;

export default investigator.reducer;